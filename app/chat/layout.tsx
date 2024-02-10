import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
