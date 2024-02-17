"use client";
import { useActiveItemContext } from "@/context/active-item-context";
import { DashboardItems } from "@/lib/types";
import ChatDisplay from "./chat-display";
import NoteDisplay from "./note-display";

type ItemsProps = {
  items: DashboardItems;
};

const Items = ({ items }: ItemsProps) => {
  const { activeItems } = useActiveItemContext();
  const { chats, folders, error } = items;
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full pt-6">
      {error && <p>Error: {error}</p>}
      {activeItems === "Chats" ? (
        <ChatDisplay chats={chats} />
      ) : (
        <NoteDisplay folders={folders} />
      )}
    </div>
  );
};

export default Items;
