import { newChat } from "@/actions/chatActions";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomTooltip from "../ui/custom-tooltip";
import SubmitButtonIcon from "../ui/submit-button-icon";

const CreateNewChat = () => {
  const { showToast } = useToast();
  const { push } = useRouter();
  const handleNewChat = async (formData: FormData) => {
    const { success, error, chatId } = await newChat(formData);
    if (success) {
      showToast({ success: true, successMessage: "Chat created successfully" });
      push(`/chat/${chatId}`);
    } else {
      const err = getErrorMessage(error);
      toast.error(err);
    }
  };
  return (
    <form action={handleNewChat}>
      <SubmitButtonIcon>
        <CustomTooltip content="New Chat">
          <SquarePen />
        </CustomTooltip>
      </SubmitButtonIcon>
    </form>
  );
};

export default CreateNewChat;
