"use client";

import { useActiveItemContext } from "@/context/active-item-context";
import DeleteItem from "../user-actions/delete-item";

type ItemOptionsProps = {
  id: string;
};

const ItemOptions = ({ id }: ItemOptionsProps) => {
  const { activeItems } = useActiveItemContext();
  return (
    <ul className="flex flex-row items-center justify-center">
      <li>
        <DeleteItem id={id} />
      </li>
    </ul>
  );
};

export default ItemOptions;
