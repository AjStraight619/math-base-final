import { getChatById } from "@/actions/chatActions";
import ChatWrapper from "./chat-wrapper";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ChatData = async ({ chatId }: { chatId: string }) => {
  const chat = await getChatById(chatId);

  return <ChatWrapper chat={chat} />;
};

export default ChatData;
