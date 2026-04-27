import { AISuggestion } from "../types";

const grokKey = process.env.GROK_API_KEY || process.env.GROQ_API_KEY;

function fallbackAnalysis(code: string, language: string) {
  const lines = code.split("\n").length;
  const score = Math.max(45, Math.min(92, 82 - Math.floor(lines / 12)));

  return {
    score,
    summary: `Automated fallback review for ${language} code. Configure GROK_API_KEY (or GROQ_API_KEY) for richer analysis.`,
    suggestions: [
      {
        line: 1,
        type: "suggestion" as const,
        message: "AI fallback mode is active, so this review is intentionally lightweight.",
      },
    ],
  };
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
  if (grokKey) {
    try {
      return normalizeAnalysis(await analyzeWithGrok(code, language));
    } catch (error) {
      console.warn("Grok/Groq analysis failed, using fallback review.", error);
    }
  }

  return normalizeAnalysis(fallbackAnalysis(code, language));
}

function buildPrompt(code: string, language: string) {
  return `Analyze the following ${language} code and return a JSON object with:
- score: number (0-100, code quality score)
- summary: string (2-3 sentence overall assessment)
- suggestions: array of { line: number, type: "error"|"warning"|"suggestion"|"praise", message: string }

Code:
${code}

Return ONLY valid JSON, no markdown.`;
}

async function analyzeWithGrok(code: string, language: string) {
  if (!grokKey) {
    throw new Error("Grok/Groq is not configured");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${grokKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROK_MODEL || process.env.GROQ_MODEL || "openai/gpt-oss-120b",
      temperature: 0.2,
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
    throw new Error(`Grok/Groq request failed: ${response.status} ${errorBody}`);
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
    throw new Error("Grok/Groq response did not contain any content");
  }

  return parseJsonPayload(content);
}

function normalizeAnalysis(payload: {
  score?: number;
  summary?: string;
  suggestions?: AISuggestion[];
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
  };
}
