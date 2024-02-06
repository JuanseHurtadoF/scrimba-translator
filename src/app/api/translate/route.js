import OpenAI from "openai";

export async function GET(req) {
  // get params from request
  const params = req.nextUrl.searchParams;

  // get text and language from params
  const text = params.get("text");
  const language = params.get("language");

  // Initialize the OpenAI API
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You will be provided with a sentence in English, and your task is to translate it into ${language}.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });

  // Get translated text from openai
  const translatedText = response.choices[0].message.content;

  // Create a new Response object with the JSON data
  return new Response(JSON.stringify({ translation: translatedText }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
