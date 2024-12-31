import { task } from "@trigger.dev/sdk/v3";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openAiTask = task({
  id: "open-ai-taks",
  retry: {
    maxAttempts: 3,
  },
  run: async (payload: { text: string }) => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // return "Hello world!";
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é especializado em corrigir erros gramáticais de português. Responda todas as suas perguntas com um tom de brincadeira, sendo amigável e talvez fazendo o usuário rir.",
        },
        {
          role: "user",
          content: `Corriga esse texto: ${payload.text}`,
        },
      ],
    });
    return response.choices[0].message.content;
  },
});
