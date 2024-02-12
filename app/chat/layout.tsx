import { getSidebarMetaData } from "@/actions/chat-actions";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarMetaData = await getSidebarMetaData();

  // TODO: Structure chat layout
  return (
    <div>
      <Sidebar sidebarMetaData={sidebarMetaData} />
      {children}
    </div>
  );
}
