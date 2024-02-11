import ChatWrapper from "@/components/chat-page/chat-wrapper";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const { chatId } = params;
  return (
    <main className="flex flex-col h-screen">
      <ChatWrapper />
    </main>
  );
}
