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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ChatData = async ({ chatId }: { chatId: string }) => {
  const chat = await getChatById(chatId);

  await delay(5000);

  return <ChatWrapper chat={chat} />;
};

export default ChatData;
