"use client";

import { Message } from "ai/react";
import { UserAvatar } from "../avatars/avatars";

type ChatMessagesProps = {
  messages: Message[];
  error: Error | undefined;
};

const ChatMessages = ({ messages, error }: ChatMessagesProps) => {
  return (
    <div className="container mx-auto overflow-auto p-4 flex-1 max-w-2xl">
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
    </div>
  );
};

export default ChatMessages;
