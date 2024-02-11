"use client";
import { SidebarMetaData } from "@/lib/types";
import { useState } from "react";

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

  console.log(notes);

  return (
    <div>
      <button onClick={() => toggleView("chats")}>Chats</button>
      <button onClick={() => toggleView("notes")}>Notes</button>

      {error && <p>Error: {error}</p>}

      <ul>
        {currentView === "chats"
          ? chats.map((chat) => <li key={chat.id}>{chat.title}</li>)
          : notes.map((note) => <li key={note.id}>{note.title}</li>)}
      </ul>
    </div>
  );
};
