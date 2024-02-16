"use client";
import { SidebarMetaData } from "@/lib/types";
import { useState } from "react";
import SidebarItems from "../sidebar/sidebar-items";

type SidebarChatProps = {
  sidebarMetaData: SidebarMetaData;
};

export const SidebarChat = ({ sidebarMetaData }: SidebarChatProps) => {
  const { chats, notes, error } = sidebarMetaData;
  const [currentView, setCurrentView] = useState("chats");

  const toggleView = (view: "chats" | "notes") => {
    console.log("Current view: ", view);
    setCurrentView(view);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-evenly">
        <button onClick={() => toggleView("chats")}>Chats</button>
        <button onClick={() => toggleView("notes")}>Notes</button>
      </div>

      {error && <p>Error: {error}</p>}

      {currentView === "chats" ? (
        <SidebarItems items={chats} />
      ) : (
        <SidebarItems items={notes} />
      )}
    </div>
  );
};
