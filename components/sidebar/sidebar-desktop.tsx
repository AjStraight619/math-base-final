import { SidebarMetaData } from "@/lib/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tally1 } from "lucide-react";
import { useState } from "react";
import Header from "../ui/header";
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
        className="fixed top-0 left-0 w-48 h-full flex flex-col justify-between border-r p-2 z-50 bg-black"
      >
        <div>
          <Header width={40} height={40} />
          {children}
        </div>
        <UserOptions
          mostRecentChatId={sidebarMetaData.chats[0]?.id}
          mostRecentNoteId={sidebarMetaData.notes[0]?.id}
        />
      </motion.aside>
      <button
        key={isOpen ? "open" : "closed"}
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
