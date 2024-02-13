import ChatWrapper from "@/components/chat-page/chat-wrapper";
import { prisma } from "@/lib/prisma";

export const getChatById = async (chatId: string) => {
  const chatById = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
  });
  return chatById;
};

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  const chat = await getChatById(chatId);

  return (
    <main className="flex flex-col h-screen">
      <ChatWrapper chat={chat} />
    </main>
  );
}
