import { EditChat } from "@/actions/chatActions";

import { PencilLine } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SubmitButton from "../ui/submit-button";
import { Textarea } from "../ui/textarea";

type EditItemProps = {
  id: string;
  title?: string;
  content?: string;
};

const EditItem = ({ id, title, content }: EditItemProps) => {
  const handleEdit = async (formData: FormData) => {
    formData.append("id", id);
    const editedItem = await EditChat(formData);
    console.log(editedItem);
  };

  //   const handleChange = (
  //     e:
  //       | React.ChangeEvent<HTMLInputElement>
  //       | React.ChangeEvent<HTMLTextAreaElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     setEditForm((prev) => ({ ...prev, [name]: value }));
  //   };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-primary">
          <PencilLine size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <form action={handleEdit}>
          <DialogHeader>
            <DialogTitle>
              <Label htmlFor="title" className="self-start">
                Title
              </Label>
              <Input name="title" defaultValue={title} />
            </DialogTitle>
          </DialogHeader>

          <Label htmlFor="content" className="self-start">
            Content
          </Label>
          <Textarea name="content" defaultValue={content} />
          <DialogFooter className="pt-2 flex flex-row items-center justify-between w-full">
            <SubmitButton>Save</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditItem;
