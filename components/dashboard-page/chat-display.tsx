import { ChatWithLastMessage } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
  return (
    <>
      <header className="text-muted-foreground">Most recent chats</header>
      <motion.ul
        variants={itemVariants}
        animate="show"
        initial="hidden"
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2 mx-auto px-4"
      >
        {chats.map((chat) => (
          <motion.li
            variants={items}
            whileHover={{ scale: 1.05 }}
            key={chat.id}
          >
            <Card className="max-w-[12rem] relative">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                  <span className="text-lg">{chat.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {chat.createdAt.toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{chat.messages[0].content}</p>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default ChatDisplay;
