import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface AISuggestion {
  line: number;
  type: "error" | "warning" | "suggestion" | "praise";
  message: string;
}

export const analyzeCode = async (code: string, language: string) => {
  try {
    const prompt = `
You are a senior software engineer performing a code review.

Analyze the following ${language} code and return STRICT JSON in this format:

{
  "score": number (0-100),
  "summary": "short paragraph",
  "suggestions": [
    {
      "line": number,
      "type": "error" | "warning" | "suggestion" | "praise",
      "message": "explanation"
    }
  ]
}

Rules:
- Be precise
- Mention exact line numbers
- Avoid unnecessary suggestions
- Score based on code quality, readability, and performance

Code:
${code}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // fast + good
      messages: [
        { role: "system", content: "You are an expert code reviewer." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content;

    // ⚠️ critical: parse safely
    const parsed = JSON.parse(raw || "{}");

    return {
      aiScore: parsed.score || 0,
      aiSummary: parsed.summary || "",
      aiSuggestions: parsed.suggestions || [],
    };
  } catch (error) {
    console.error("AI error:", error);

    return {
      aiScore: 0,
      aiSummary: "AI analysis failed",
      aiSuggestions: [],
    };
  }
};