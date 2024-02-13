import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tally1 } from "lucide-react";
import { useState } from "react";
import Header from "../ui/header";

type SidebarDesktopProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarDesktop = ({
  children,
  isOpen,
  toggleSidebar: parentToggleSidebar,
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
        className="fixed top-0 left-0 w-48 h-full border border-r p-2 z-50 bg-black"
      >
        <Header width={40} height={40} />
        {children}
      </motion.aside>
      <button
        onClick={toggleSidebar}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`fixed top-1/2 ${
          isOpen ? "left-[13rem]" : "left-[0.8rem]"
        } -translate-y-1/2 transform z-50`}
      >
        {isOpen ? (
          isHovering ? (
            <ChevronLeft />
          ) : (
            <Tally1 className="ml-2" />
          )
        ) : (
          <ChevronRight />
        )}
      </button>
    </>
  );
};

export default SidebarDesktop;
