"use client";
import { createContext, useContext, useState } from "react";

type ActiveItemContextType = {
  activeItems: "Chats" | "Notes";
  setActiveItems: React.Dispatch<React.SetStateAction<"Chats" | "Notes">>;
};

export const ActiveItemContext = createContext<ActiveItemContextType | null>(
  null
);

export default function ActiveItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItems, setActiveItems] = useState<"Chats" | "Notes">("Chats");
  return (
    <ActiveItemContext.Provider value={{ activeItems, setActiveItems }}>
      {children}
    </ActiveItemContext.Provider>
  );
}

export function useActiveItemContext() {
  const context = useContext(ActiveItemContext);

  if (context === null) {
    throw new Error(
      "useActiveItemContext must be used within an ActiveItemContextProvider"
    );
  }

  return context;
}
