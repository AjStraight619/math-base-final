import { useActiveItemContext } from "@/context/active-item-context";
import { Chat, Note } from "@/lib/types";
import { isChat, isNote } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type EditItemDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: Chat | Note | null;
  setItemData: React.Dispatch<React.SetStateAction<Chat | Note | null>>;
};

const EditItemDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  itemData,
  setItemData,
}: EditItemDialogProps) => {
  const { activeItems } = useActiveItemContext();
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{itemData?.title}</DialogTitle>
        </DialogHeader>
        {activeItems === "Chats" && isChat(itemData) && (
          <div>{itemData?.id}</div>
        )}

        {activeItems === "Notes" && isNote(itemData) && (
          <div>{itemData?.id}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;
