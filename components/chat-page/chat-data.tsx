import { prisma } from "@/lib/prisma";
import ChatWrapper from "./chat-wrapper";

export const getChatById = async (chatId: string) => {
  const chatById = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return chatById;
};

const ChatData = async ({ chatId }: { chatId: string }) => {
  const chat = await getChatById(chatId);

  console.log("Chat: ", chat);

  return <ChatWrapper chat={chat} />;
};

export default ChatData;
