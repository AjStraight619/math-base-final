import { useItemDetails } from "@/hooks/useItemDetails";
import { MoreVertical, PencilLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import DeleteItem from "../user-actions/delete-item";
import EditItemDialog from "../user-actions/edit-item-dialog";
import ViewItem from "../user-actions/view-item";

type ItemOptionsProps = {
  id: string;
  ulClassName?: string;
  liClassName?: string;
  iconSize?: number;
};

const ItemOptions = ({
  id,
  ulClassName,
  liClassName,
  iconSize,
}: ItemOptionsProps) => {
  const {
    itemData,
    fetchItemDetails,
    isDialogOpen,
    setIsDialogOpen,
    isPopoverOpen,
    setIsPopoverOpen,
    deleteItem,
    setItemData,
  } = useItemDetails();

  const pathname = usePathname();
  const isDashboardPath = pathname === "/dashboard";
  const isChatPath = pathname.startsWith("/chat");

  return (
    <>
      <Popover
        open={isPopoverOpen}
        onOpenChange={() => setIsPopoverOpen((prev) => !prev)}
      >
        <PopoverTrigger asChild>
          <button>
            <MoreVertical size={15} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[8rem]">
          <ul>
            <li
              onClick={() => fetchItemDetails(id)}
              className="flex items-center gap-2 p-2 cursor-pointer"
            >
              <PencilLine size={iconSize} />
              <span>Edit</span>
            </li>
            <li className="flex items-center gap-2 p-2 cursor-pointer">
              <DeleteItem id={id} />
            </li>
            {isDashboardPath && (
              <li className="flex items-center gap-2 p-2 cursor-pointer">
                <ViewItem id={id} />
              </li>
            )}
          </ul>
        </PopoverContent>
      </Popover>

      {isDialogOpen && itemData && (
        <EditItemDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          itemData={itemData}
          setItemData={setItemData}
        />
      )}
    </>
  );
};

export default ItemOptions;
