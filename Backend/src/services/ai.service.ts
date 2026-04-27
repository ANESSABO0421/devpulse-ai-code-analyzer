import Anthropic from "@anthropic-ai/sdk";
import { AISuggestion } from "../types";

const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
const openAiKey = process.env.OPENAI_API_KEY;
const anthropicKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;

const anthropic = anthropicKey
  ? new Anthropic({ apiKey: anthropicKey })
  : null;

function fallbackAnalysis(code: string, language: string) {
  const lines = code.split("\n").length;
  const score = Math.max(45, Math.min(92, 82 - Math.floor(lines / 12)));

  return {
    score,
    summary: `Automated fallback review for ${language} code. Configure GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY for richer analysis.`,
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
  if (geminiKey) {
    try {
      return normalizeAnalysis(await analyzeWithGemini(code, language));
    } catch (error) {
      console.warn("Gemini analysis failed, falling back to the next provider.", error);
    }
  }

  if (openAiKey) {
    try {
      return normalizeAnalysis(await analyzeWithOpenAI(code, language));
    } catch (error) {
      console.warn("OpenAI analysis failed, falling back to the next provider.", error);
    }
  }

  if (anthropic) {
    try {
      return normalizeAnalysis(await analyzeWithAnthropic(code, language));
    } catch (error) {
      console.warn("Anthropic analysis failed, using fallback review.", error);
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

async function analyzeWithAnthropic(code: string, language: string) {
  if (!anthropic) {
    throw new Error("Anthropic is not configured");
  }

  const prompt = buildPrompt(code, language);

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1200,
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content
    .filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n");

  return parseJsonPayload(text);
}

async function analyzeWithGemini(code: string, language: string) {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: buildPrompt(code, language),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorBody}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };

  const content = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n");
  if (!content) {
    throw new Error("Gemini response did not contain any content");
  }

  return parseJsonPayload(content);
}

async function analyzeWithOpenAI(code: string, language: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
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
    throw new Error(`OpenAI request failed: ${response.status} ${errorBody}`);
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
    throw new Error("OpenAI response did not contain any content");
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
