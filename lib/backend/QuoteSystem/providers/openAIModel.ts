import OpenAI from "openai";
import { sanitizeQuote } from "../sanitizer";

export async function generateQuoteWithOpenAI(
    prompt: string
): Promise<string[]> {
    const client = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

    const response = await client.chat.completions.create({
        model: process.env.OPEN_AI_MODEL
            ? process.env.OPEN_AI_MODEL
            : "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 60,
        n: process.env.QUOTE_PER_REQUEST
            ? Number(process.env.QUOTE_PER_REQUEST)
            : 1,
    });

    return response.choices
        .map((choice) => sanitizeQuote(choice.message?.content || ""))
        .filter(Boolean);
}
