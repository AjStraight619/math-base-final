"use client";
import { useId } from "@/hooks/useId";
import { Message } from "ai/react";
import { useLayoutEffect, useRef } from "react";
import { AiAvatar, UserAvatar } from "../avatars/avatars";
import MarkdownRenderer from "./markdown-renderer";

type ChatMessagesProps = {
  messages: Message[];
  chatError: string;
};

const ChatMessages = ({ messages, chatError }: ChatMessagesProps) => {
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useLayoutEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`container p-4 flex flex-col md:max-w-2xl w-full`}>
      <ul className="list-none flex flex-col space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="flex flex-row gap-2">
            {message.role === "user" ? <UserAvatar /> : <AiAvatar />}

            <MarkdownRenderer content={message.content} />
            <div ref={bottomOfMessagesRef}></div>
            {chatError && <p className="text-red-500">{chatError}</p>}
          </li>
        ))}
      </ul>
      <div className="h-[60px]"></div>
    </div>
  );
};

export default ChatMessages;
