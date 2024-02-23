"use client";
import { getChatById } from "@/actions/chatActions";
import { useSidebarContext } from "@/context/sidebar-context";
import { useId } from "@/hooks/useId";
import { getErrorMessage } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { Message, UseChatOptions } from "ai";
import { useChat } from "ai/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

type ChatWrapperProps = {
  chat: Prisma.PromiseReturnType<typeof getChatById>;
};

const ChatWrapper = ({ chat }: ChatWrapperProps) => {
  const [chatError, setChatError] = useState<string>("");
  const counterRef = useRef(0);
  const chatId = useId();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,

    reload,
  } = useExtendedChat({
    options: {
      api: `/api/chat?chatId=${chatId}`,
      onError: (err) => {
        const chatError = getErrorMessage(err);
        setChatError(chatError);
      },
    },
    chat,
  });

  useEffect(() => {
    counterRef.current++;
    console.log("component re rendered: ", counterRef.current);
  }, []);

  const { isSidebarOpen } = useSidebarContext();

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-0"
      }`}
    >
      <ChatMessages messages={messages} chatError={chatError} />

      <ChatInput
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        reload={reload}
        input={input}
      />
    </div>
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
