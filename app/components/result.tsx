"use client";

import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { Loader2Icon } from "lucide-react";
function Result({
  runId,
  publicAccessToken,
}: {
  runId: string;
  publicAccessToken: string;
}) {
  const { run } = useRealtimeRun(runId, {
    accessToken: publicAccessToken,
  });

  return (
    <div className="mt-2">
      {run?.status === "EXECUTING" && (
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <span>Processando...</span>
        </div>
      )}
      {run?.status === "FAILED" && (
        <div className="text-red-500">Erro: {run.error?.message}</div>
      )}

      {run?.output && (
        <div className="space-y-2 max-w-[450px]">
          <h2 className="text-3xl font-bold">Texto corrigido:</h2>
          <p>{run?.output}</p>
        </div>
      )}
    </div>
  );
}
export default Result;
