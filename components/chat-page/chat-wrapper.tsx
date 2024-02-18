"use client";

import { useId } from "@/hooks/useId";
import { Prisma } from "@prisma/client";
import { Message, UseChatOptions } from "ai";
import { useChat } from "ai/react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { getChatById } from "./chat-data";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

type ChatWrapperProps = {
  chat: Prisma.PromiseReturnType<typeof getChatById>;
};

const ChatWrapper = ({ chat }: ChatWrapperProps) => {
  const counterRef = useRef(0);
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatId = useId();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
  } = useExtendedChat({
    options: { api: `/api/chat?chatId=${chatId}` },
    chat,
  });

  useEffect(() => {
    counterRef.current++;
    console.log("component re rendered: ", counterRef.current);
  }, []);

  useLayoutEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      <div ref={bottomOfMessagesRef}></div>
    </>
  );
};

export default ChatWrapper;

type UseExtendedChatProps = {
  options: UseChatOptions;
  chat: Prisma.PromiseReturnType<typeof getChatById>;
};

type ExtendedMessage = Message & {
  chatId?: string;
  savedToNote?: boolean;
  noteId?: string;
  tags?: string[];
  folderId?: string;
  role: "function" | "user" | "data" | "system" | "assistant" | "tool";
};

const useExtendedChat = ({ options, chat }: UseExtendedChatProps) => {
  const { messages: liveMessages, ...rest } = useChat(options);

  const extendedMessages = useMemo(() => {
    const dbMessages: ExtendedMessage[] = chat?.messages || [];

    console.log("in use memo hook");

    const transformedLiveMessages: ExtendedMessage[] = liveMessages.map(
      (liveMessage) => {
        const extendedMessage: ExtendedMessage = {
          ...liveMessage,
          chatId: chat?.id || undefined,
          savedToNote: false,
          noteId: undefined,
          tags: [],
          folderId: undefined,
        };

        return extendedMessage;
      }
    );

    return [...dbMessages, ...transformedLiveMessages];
  }, [liveMessages, chat]);

  return { messages: extendedMessages, ...rest };
};
