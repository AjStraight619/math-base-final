"use client";
import { useSidebarContext } from "@/context/sidebar-context";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

const variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn",
    },
  },
};

export const Header = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isSidebarOpen } = useSidebarContext();
  return (
    <>
      {isAuthenticated ? (
        <motion.header
          animate="show"
          initial="hidden"
          variants={variants}
          className={`text-2xl font-semibold self-center pt-20 ${
            isSidebarOpen ? "ml-8" : ""
          }`}
        >
          {isLoading && <Skeleton />}
          Welcome Back, {user?.given_name}!
        </motion.header>
      ) : (
        <Skeleton />
      )}
    </>
  );
};
