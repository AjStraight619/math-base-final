"use client";

import { useId } from "@/hooks/useId";
import { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { UserAvatar } from "../avatars/avatars";

type ChatMessagesProps = {
  messages: Message[];
  error: Error | undefined;
};

const ChatMessages = ({ messages, error }: ChatMessagesProps) => {
  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (bottomOfMessagesRef?.current) {
      bottomOfMessagesRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [id]);

  return (
    <div className="container mx-auto overflow-auto p-4 flex flex-col flex-1 max-w-2xl justify-end items-end">
      {/* Use some lorem ipsum text here to simulate messages */}

      <div className="flex flex-row gap-2">
        <UserAvatar />
        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio
          vitae vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Vivamus lacinia odio vitae vestibulum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
          vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum.
          {/* Add more lorem ipsum text as needed */}
        </p>
      </div>
      <div className="h-[60px]"></div>
      <div ref={bottomOfMessagesRef}></div>
    </div>
  );
};

export default ChatMessages;
