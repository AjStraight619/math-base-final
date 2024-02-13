"use client";

import { getChatById } from "@/app/chat/[chatId]/page";
import { Prisma } from "@prisma/client";
import { useChat } from "ai/react";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

type ChatWrapperProps = {
  chat: Prisma.PromiseReturnType<typeof getChatById>;
};

const ChatWrapper = ({ chat }: ChatWrapperProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
  });

  return (
    <ScrollArea>
      <ChatMessages messages={messages} error={error} />
      <ChatInput
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        reload={reload}
        input={input}
      />
    </ScrollArea>
  );
};

export default ChatWrapper;
