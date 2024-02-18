"use client";

import { useActiveItemContext } from "@/context/active-item-context";
import DeleteItem from "../user-actions/delete-item";
import EditItem from "../user-actions/edit-item";
import ViewItem from "../user-actions/view-item";

type ItemOptionsProps = {
  id: string;
  title?: string;
  content?: string;
};

const ItemOptions = ({ id, title, content }: ItemOptionsProps) => {
  const { activeItems } = useActiveItemContext();
  return (
    <div className="flex justify-between items-center w-full text-primary/70">
      <div className="flex gap-2">
        <DeleteItem id={id} />
        <EditItem title={title} content={content} id={id} />
      </div>
      <ViewItem id={id} />
    </div>
  );
};

export default ItemOptions;
