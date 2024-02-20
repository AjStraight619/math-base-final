import { deleteChat, getChatById } from "@/actions/chatActions"; // Adjust the import path according to your project structure
import { deleteNote, getNoteById } from "@/actions/noteAction";
import { useActiveItemContext } from "@/context/active-item-context";
import { Chat, Note } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useItemDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [itemData, setItemData] = useState<Chat | Note | null>(null);
  const { activeItems } = useActiveItemContext();

  const fetchItemDetails = useCallback(
    async (id: string) => {
      let data: Chat | Note | null = null;
      try {
        if (activeItems === "Chats") {
          data = await getChatById(id);
        } else if (activeItems === "Notes") {
          data = await getNoteById(id);
        } else {
          data = null;
        }

        if (data) {
          setItemData(data);
          setIsDialogOpen(true);
        } else {
          toast.error("Failed to fetch item details.");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [activeItems]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      try {
        if (activeItems === "Chats") {
          await deleteChat(id);
        } else if (activeItems === "Notes") {
          await deleteNote(id);
        }
        toast.success("Item deleted successfully.");

        setIsDialogOpen(false);
        setItemData(null);
        setIsPopoverOpen(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [activeItems]
  );

  return {
    isDialogOpen,
    setIsDialogOpen,
    isPopoverOpen,
    setIsPopoverOpen,
    itemData,
    setItemData,
    fetchItemDetails,
    deleteItem,
  };
};
