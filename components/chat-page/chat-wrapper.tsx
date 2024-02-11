"use client";

import { useChat } from "ai/react";
import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

const ChatWrapper = () => {
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
