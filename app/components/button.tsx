"use client";

import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="p-2 rounded bg-slate-700 flex items-center text-center justify-center"
      disabled={pending}
    >
      {pending && <Loader2Icon className="animate-spin mr-2" />}
      Corrigir texto
    </button>
  );
};

export default SubmitButton;
