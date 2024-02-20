import { SidebarMetaData } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tally1 } from "lucide-react";
import { useState } from "react";
import Header from "../ui/header";
import { ScrollArea } from "../ui/scroll-area";
import CreateNewChat from "../user-actions/create-new-chat";
import UserOptions from "./user-options";

type SidebarDesktopProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
  sidebarMetaData: SidebarMetaData;
};

const SidebarDesktop = ({
  children,
  isOpen,
  toggleSidebar: parentToggleSidebar,
  sidebarMetaData,
}: SidebarDesktopProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: isHovering ? 0.5 : 1 },
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const toggleSidebar = () => {
    parentToggleSidebar();
    setIsHovering(false);
  };

  return (
    <>
      <motion.aside
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        transition={spring}
        className="fixed top-0 left-0 w-48 h-full flex flex-col border-r pl-2 z-50 bg-black"
      >
        <div className="fixed top-2 left-1 w-full flex flex-row items-center justify-center">
          <div className="flex flex-row items-center gap-x-4">
            <Header width={40} height={40} />
            <CreateNewChat />
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto mt-12">
          {children}
        </ScrollArea>
        <div className="mt-auto pr-2 mb-4 sm:mb-2">
          <UserOptions
            mostRecentChatId={sidebarMetaData.chats[0]?.id}
            mostRecentNoteId={sidebarMetaData.notes[0]?.id}
          />
        </div>
      </motion.aside>
      <button
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`fixed top-1/2 ${
          isOpen ? "left-[12.5rem]" : "left-[0.8rem]"
        } -translate-y-1/2 transform z-50`}
      >
        {isOpen ? (
          isHovering ? (
            <ChevronLeft />
          ) : (
            <Tally1 className="ml-1" />
          )
        ) : (
          <ChevronRight />
        )}
      </button>
    </>
  );
};

export default SidebarDesktop;
