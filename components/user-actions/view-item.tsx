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
    <Link className="hover:text-primary" href={getRoute()}>
      <ExternalLink size={20} />
    </Link>
  );
};

export default ViewItem;
