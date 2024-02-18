import ChatData from "@/components/chat-page/chat-data";
import ChatSkeleton from "@/components/chat-page/chat-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";

export default async function ChatPage({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = params;

  return (
    <main className="flex flex-col h-screen">
      <ScrollArea>
        <Suspense key={chatId} fallback={<ChatSkeleton />}>
          <ChatData chatId={chatId} />
        </Suspense>
      </ScrollArea>
    </main>
  );
}
