import { useActiveItemContext } from "@/context/active-item-context";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const ViewItem = ({ id }: { id: string }) => {
  const { activeItems } = useActiveItemContext();

  const getRoute = () => {
    if (activeItems === "Chats") {
      return `/chat/${id}`;
    } else {
      return `/note/${id}`;
    }
  };
  return (
    <Link className="flex items-center" href={getRoute()}>
      <ExternalLink size={20} />
      <span className="ml-2">View</span>
    </Link>
  );
};

export default ViewItem;
