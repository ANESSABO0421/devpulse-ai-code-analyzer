import { AISuggestion } from "../types";

function getGroqKey() {
  return process.env.GROQ_API_KEY || "";
}

function parseJsonPayload(text: string) {
  const trimmed = text.trim();
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("AI response did not contain JSON");
  }

  return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
}

export async function analyzeCode(code: string, language: string) {
  const groqKey = getGroqKey();
  if (!groqKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  return normalizeAnalysis(await analyzeWithGroq(code, language, groqKey));
}

function buildPrompt(code: string, language: string) {
  return `Analyze the following ${language} code and return a JSON object with:
- score: number (0-100, code quality score)
- summary: string (2-3 sentence overall assessment)
- suggestions: array of { line: number, type: "error"|"warning"|"suggestion"|"praise", message: string }
- correctedCode: string (a complete, improved version of the original code incorporating all suggestions. MUST be a string, not an array)

Code:
${code}

Return ONLY valid JSON, no markdown.`;
}

async function analyzeWithGroq(code: string, language: string, groqKey: string) {
  if (!groqKey) {
    throw new Error("Groq is not configured");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      temperature: 0.2,
      reasoning_effort: "low",
      max_completion_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: buildPrompt(code, language),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq request failed: ${response.status} ${errorBody}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Groq response did not contain any content");
  }

  return parseJsonPayload(content);
}

function normalizeAnalysis(payload: {
  score?: number;
  summary?: string;
  suggestions?: AISuggestion[];
  correctedCode?: string;
}) {
  return {
    aiScore: Math.max(0, Math.min(100, Number(payload.score) || 0)),
    aiSummary: payload.summary || "No summary returned.",
    aiSuggestions: Array.isArray(payload.suggestions)
      ? payload.suggestions.map((item) => ({
          line: Number(item.line) || 1,
          type: item.type || "suggestion",
          message: item.message || "No message provided.",
        }))
      : [],
    correctedCode: payload.correctedCode || "",
  };
}
