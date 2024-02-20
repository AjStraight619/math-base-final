import ItemOptions from "@/components/common/item-options";
import { useSidebarContext } from "@/context/sidebar-context";
import { ChatWithLastMessage } from "@/lib/types";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type ChatDisplayProps = {
  chats: ChatWithLastMessage;
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const items = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const ChatDisplay = ({ chats }: ChatDisplayProps) => {
  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      <header className="text-muted-foreground">Most recent chats</header>
      <motion.ul
        variants={itemVariants}
        animate="show"
        initial="hidden"
        className={`grid grid-cols-1 gap-2 px-4 justify-items-center align-middle ${
          isSidebarOpen
            ? "md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
            : "md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 mx-auto"
        }`}
      >
        {chats.map((chat) => (
          <motion.li
            variants={items}
            whileHover={{ scale: 1.05 }}
            key={chat.id}
          >
            <Card className="max-w-[12rem] h-[14rem] relative">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center p-1">
                  <span className="text-lg">{chat.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {chat.createdAt.toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-pretty line-clamp-3">
                  {chat.messages[0]?.content}
                </p>
              </CardContent>
              <div className="absolute bottom-2 w-full">
                <ItemOptions id={chat?.id} iconSize={20} />
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default ChatDisplay;
