"use client";

import { Prisma } from "@prisma/client";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { getChatById } from "./chat-data";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

type ChatWrapperProps = {
  chat: Prisma.PromiseReturnType<typeof getChatById>;
};

const ChatWrapper = ({ chat }: ChatWrapperProps) => {
  const counterRef = useRef(0);
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

  useEffect(() => {
    counterRef.current++;
    console.log("component re rendered: ", counterRef.current);
  }, []);

  return (
    <>
      <ChatMessages messages={messages} error={error} />
      <ChatInput
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        reload={reload}
        input={input}
      />
    </>
  );
};

export default ChatWrapper;
