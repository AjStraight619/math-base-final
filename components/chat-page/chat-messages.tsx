"use client";
import { useId } from "@/hooks/useId";
import { Message } from "ai/react";
import { useRef } from "react";
import { AiAvatar, UserAvatar } from "../avatars/avatars";
import MarkdownRenderer from "./markdown-renderer";

type ChatMessagesProps = {
  messages: Message[];
  error: Error | undefined;
};

const ChatMessages = ({ messages, error }: ChatMessagesProps) => {
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // useLayoutEffect(() => {
  //   if (bottomOfMessagesRef.current) {
  //     bottomOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);

  return (
    <div className={`container p-4 flex flex-col max-w-2xl`}>
      <ul className="list-none flex flex-col space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="flex flex-row gap-2">
            {message.role === "user" ? <UserAvatar /> : <AiAvatar />}
            <div>
              <MarkdownRenderer content={message.content} />
              {/* <div ref={bottomOfMessagesRef}></div> */}
            </div>
          </li>
        ))}
      </ul>
      <div className="h-[60px]"></div>
    </div>
  );
};

export default ChatMessages;
