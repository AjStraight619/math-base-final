import EditItemDialog from "@/components/user-actions/edit-item-dialog";
import { useItemDetails } from "@/hooks/useItemDetails";
import ItemOptions from "../common/item-options";
import SidebarItem from "./sidebar-item";

type SidebarItemsProps = {
  items: {
    id: string;
    title: string;
  }[];
};

const SidebarItems = ({ items }: SidebarItemsProps) => {
  const { itemData, setItemData, isDialogOpen, setIsDialogOpen } =
    useItemDetails();

  return (
    <>
      <ul className="flex flex-col gap-4 md:gap-2">
        {items.map((item) => (
          <li
            className="flex flex-row items-center justify-between pr-2"
            key={item.id}
          >
            <SidebarItem item={item} />
            <ItemOptions id={item.id} />
          </li>
        ))}
      </ul>
      {isDialogOpen && itemData && (
        <EditItemDialog
          itemData={itemData}
          setItemData={setItemData}
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
        />
      )}
    </>
  );
};

export default SidebarItems;
