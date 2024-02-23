import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type CustomTooltipProps = {
  children: React.ReactNode;
  content: string;
};

const CustomTooltip = ({ children, content }: CustomTooltipProps) => {
  return (
    <TooltipProvider delayDuration={0.1}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className="z-[999]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
