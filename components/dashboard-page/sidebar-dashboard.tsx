import { useActiveItemContext } from "@/context/active-item-context";
import { Suspense } from "react";
import NewChatForm from "../sidebar/new-chat-form";
import Search from "../sidebar/search";
import { Separator } from "../ui/separator";

const SidebarDashboard = () => {
  const { activeItems, setActiveItems } = useActiveItemContext();
  return (
    <div className="flex flex-col items-start justify-center gap-2 w-full pt-6">
      <Suspense fallback={<div>Loading...</div>}>
        <Search />
      </Suspense>
      <div className="w-full mt-6 flex flex-col">
        <span className="text-muted-foreground">{activeItems}</span>
        <Separator />
      </div>
      <NewChatForm />
    </div>
  );
};

export default SidebarDashboard;
