"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SidebarMetaData } from "@/lib/types";
import { debounce } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SidebarChat } from "../chat-page/sidebar-chat";
import SidebarDashboard from "../dashboard-page/sidebar-dashboard";
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

  if (pathname === "/") {
    return null;
  }

  const isChatPath = pathname.startsWith("/chat");
  const isDashboardPath = pathname.startsWith("/dashboard");
  console.log("Is Dashboard Path: ", isDashboardPath);
  return (
    <>
      {isDesktop ? (
        <SidebarDesktop
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          sidebarMetaData={sidebarMetaData}
        >
          {isChatPath && <SidebarChat sidebarMetaData={sidebarMetaData} />}
          {isDashboardPath && <SidebarDashboard />}
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
