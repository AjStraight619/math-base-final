import { deleteChat } from "@/actions/chatActions";
import { useToast } from "@/hooks/useToast";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import SubmitButton from "../ui/submit-button";

const DeleteItem = ({ id }: { id: string }) => {
  const { showToast } = useToast();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleDelete = async () => {
    const { success, error } = await deleteChat(id);

    if (success) {
      showToast({ success: true, successMessage: "Chat deleted successfully" });
    } else {
      showToast({ error });
    }
    setIsAccordionOpen(false);
  };

  return (
    <AlertDialog
      open={isAccordionOpen}
      onOpenChange={() => setIsAccordionOpen((prev) => !prev)}
    >
      <AlertDialogTrigger asChild>
        <button className="flex">
          <Trash2 size={20} />
          <span className="ml-2">Delete</span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the chat
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={handleDelete}>
              <SubmitButton>Delete</SubmitButton>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItem;
