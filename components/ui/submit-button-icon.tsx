import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButtonIcon = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit">
      {pending ? <Loader2 className="animate-spin self-center" /> : children}
    </button>
  );
};

export default SubmitButtonIcon;
