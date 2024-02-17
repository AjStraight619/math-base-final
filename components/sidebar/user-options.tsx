import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Bot,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  NotebookPen,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserAvatar } from "../avatars/avatars";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type UserOptionsProps = {
  mostRecentChatId: string;
  mostRecentNoteId: string;
};

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const UserOptions = ({
  mostRecentChatId,
  mostRecentNoteId,
}: UserOptionsProps) => {
  const { isLoading, user } = useKindeBrowserClient();
  const [open, setOpen] = useState(false);

  const userOptions = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      name: "Chats",
      link: `/chat/${mostRecentChatId}`,
      icon: <Bot />,
    },
    {
      name: "Notes",
      link: "/note",
      icon: <NotebookPen />,
    },
  ];

  const logoutOption = {
    name: "Logout",
    link: "/api/auth/logout",
    icon: <LogOut />,
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <div className="w-full pr-2 py-2 pl-1 flex flex-row items-center justify-start border rounded-md hover:cursor-pointer gap-1 relative">
          {isLoading && <Skeleton />}
          <UserAvatar />
          <span className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full block text-sm">
            {user?.given_name} {user?.family_name}
          </span>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-transparent to-black"></div>
          <MoreVertical className="absolute right-1 top-1/2 -translate-y-1/2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 w-[13rem] ml-1">
        <motion.ul
          animate="show"
          initial="hidden"
          variants={itemVariants}
          className="flex flex-col gap-2 items-center justify-between"
        >
          {userOptions.map((option, index) => (
            <motion.li variants={item} className="w-full" key={index}>
              <Link
                className="flex justify-start items-center text-primary/60 hover:text-primary gap-2"
                href={option.link}
              >
                <span>{option.icon}</span>
                <span>{option.name}</span>
              </Link>
            </motion.li>
          ))}

          <Separator />

          <li className="w-full">
            <Link
              className="flex justify-start items-center gap-2"
              href={logoutOption.link}
            >
              <span>{logoutOption.icon}</span>
              <span>{logoutOption.name}</span>
            </Link>
          </li>
        </motion.ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptions;
