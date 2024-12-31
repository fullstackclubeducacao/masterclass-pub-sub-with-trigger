"use server";

import { openAiTask } from "@/trigger/openai";
import { runs, tasks } from "@trigger.dev/sdk/v3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const correctText = async (prevState: any, formData: FormData) => {
  if (!formData.get("text")) {
    return { message: "Texto não pode ser vazio!" };
  }
  console.log("Triggerink OpenAI Task!");
  const response = await tasks.trigger<typeof openAiTask>("open-ai-taks", {
    text: formData.get("text") as string,
  });
  const { output } = await runs.retrieve(response.id);
  return {
    message: output,
  };
};
