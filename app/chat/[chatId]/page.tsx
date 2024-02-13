import ChatData from "@/components/chat-page/chat-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
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
        <Suspense key={chatId} fallback={<Skeleton />}>
          <ChatData chatId={chatId} />
        </Suspense>
      </ScrollArea>
    </main>
  );
}
