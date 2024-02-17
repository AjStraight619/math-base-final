import { useActiveItemContext } from "@/context/active-item-context";
import { Suspense } from "react";
import NewChatForm from "../sidebar/new-chat-form";
import Search from "../sidebar/search";

const SidebarDashboard = () => {
  const { activeItems, setActiveItems } = useActiveItemContext();
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full pt-6">
      <Suspense>
        <Search />
      </Suspense>
      <NewChatForm />
    </div>
  );
};

export default SidebarDashboard;
