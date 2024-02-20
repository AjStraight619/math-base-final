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
    <TooltipProvider delayDuration={0.2}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
