"use client";

import { SidebarMetaData } from "@/lib/types";
import { usePathname } from "next/navigation";
import { SidebarChat } from "../chat-page/sidebar-chat";
import Header from "../ui/header";

type SidebarProps = {
  sidebarMetaData: SidebarMetaData;
};

const Sidebar = ({ sidebarMetaData }: SidebarProps) => {
  const pathname = usePathname();

  const isChatPath = pathname.startsWith("/chat");
  return (
    <aside className="fixed top-0 left-0 w-48 h-full border border-r p-2 z-50 bg-black">
      <div className="flex flex-col w-full gap-4">
        <Header width={40} height={40} />

        {isChatPath && <SidebarChat sidebarMetaData={sidebarMetaData} />}
      </div>
    </aside>
  );
};

export default Sidebar;
