import { Textarea } from "../ui/textarea";

const ChatInput = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 pb-4 bg-transparent">
      <div className="container mx-auto flex justify-center max-w-2xl">
        <Textarea
          placeholder="Type a message..."
          className="flex-1 h-[52px] min-h-[52px] max-h-[200px] outline-none border rounded-xl pt-[0.8rem] pl-[3rem] pr-[2rem] bg-slate-900 overflow-hidden resize-none placeholder:text-base text-base"
        />
      </div>
    </div>
  );
};

export default ChatInput;
