"use client";

import { ScrollArea } from "../ui/scroll-area";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

const ChatWrapper = () => {
  return (
    <ScrollArea>
      <ChatMessages />
      <ChatInput />
    </ScrollArea>
  );
};

export default ChatWrapper;
