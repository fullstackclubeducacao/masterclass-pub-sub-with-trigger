import { tasks } from "@trigger.dev/sdk/v3";
import { openAiTask } from "@/trigger/openai";
import Result from "./components/result";
import { cookies } from "next/headers";
import SubmitButton from "./components/button";

const Home = async () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    console.log("Triggerink OpenAI Task!");
    const handle = await tasks.trigger<typeof openAiTask>("open-ai-taks", {
      text: formData.get("text") as string,
    });
    cookies().set("runId", handle.id);
    cookies().set("publicAccessToken", handle.publicAccessToken);
  };
  const publicAccessToken = await cookies().get("publicAccessToken")?.value;
  const runId = await cookies().get("runId")?.value;
  return (
    <div className="h-screen w-full flex-col flex items-center justify-center">
      <form className="space-y-2 flex flex-col w-[450px]" action={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Entre o texto (com erros gramáticais)"
          className="p-2 rounded text-slate-900"
        />
        <SubmitButton />
      </form>

      {runId && publicAccessToken && (
        <Result runId={runId} publicAccessToken={publicAccessToken} />
      )}
    </div>
  );
};

export default Home;
