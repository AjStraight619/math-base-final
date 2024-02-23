"use client";
import { useActiveItemContext } from "@/context/active-item-context";
import { useSidebarContext } from "@/context/sidebar-context";
import { DashboardItems } from "@/lib/types";
import ChatDisplay from "./chat-display";
import NoteDisplay from "./note-display";

type ItemsProps = {
  items: DashboardItems;
};

const Items = ({ items }: ItemsProps) => {
  const { activeItems } = useActiveItemContext();
  const { isSidebarOpen } = useSidebarContext();
  const { chats, folders, error } = items;
  return (
    <>
      {error && <p className="text-center">Error: {error}</p>}
      {activeItems === "Chats" ? (
        <ChatDisplay chats={chats} />
      ) : (
        <NoteDisplay folders={folders} />
      )}
    </>
  );
};

export default Items;
