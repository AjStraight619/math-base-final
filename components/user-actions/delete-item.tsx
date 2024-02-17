import { deleteChat } from "@/actions/chatActions";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
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
  const handleDelete = async () => {
    const { success, error } = await deleteChat(id);
    if (success) {
      toast.success("Chat deleted");
    } else {
      toast.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Trash />
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
