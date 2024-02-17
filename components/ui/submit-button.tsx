import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button className={cn("", className)} type="submit" disabled={pending}>
      {pending ? (
        <div className="">
          <Loader2 className="animate-spin self-center" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
