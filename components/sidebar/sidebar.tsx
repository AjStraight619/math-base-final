"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SidebarMetaData } from "@/lib/types";
import { debounce } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SidebarChat } from "../chat-page/sidebar-chat";
import SidebarDesktop from "./sidebar-desktop";
import SidebarMobile from "./sidebar-mobile";

type SidebarProps = {
  sidebarMetaData: SidebarMetaData;
};

const Sidebar = ({ sidebarMetaData }: SidebarProps) => {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const debouncedHandleResize = debounce(() => {
      setIsSidebarOpen(window.innerWidth > 768);
    }, 300);

    window.addEventListener("resize", debouncedHandleResize);

    debouncedHandleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const isChatPath = pathname.startsWith("/chat");
  return (
    <>
      {isDesktop ? (
        <SidebarDesktop isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
          {isChatPath && <SidebarChat sidebarMetaData={sidebarMetaData} />}
        </SidebarDesktop>
      ) : (
        <SidebarMobile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
          {isChatPath && <SidebarChat sidebarMetaData={sidebarMetaData} />}
        </SidebarMobile>
      )}
    </>
  );
};

export default Sidebar;
