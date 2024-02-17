import { newChat } from "@/actions/chatActions";
import toast from "react-hot-toast";
import SubmitButton from "../ui/submit-button";

const handleCreateChat = async (formData: FormData) => {
  const { success, error } = await newChat(formData);
  if (success) {
    toast.success("Chat created");
  } else {
    toast.error(error);
  }
};

const NewChatForm = () => {
  return (
    <form action={handleCreateChat}>
      <SubmitButton className="w-full">Create New Chat</SubmitButton>
    </form>
  );
};

export default NewChatForm;
