import { useSidebarContext } from "@/context/sidebar-context";
import { ChatRequestOptions } from "ai";
import { Loader2, Send } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import FilePreviews from "../files/file-previews";
import UploadFiles from "../files/upload-file";
import { Textarea } from "../ui/textarea";

type ChatInputProps = {
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  input: string;
};

const ChatInput = ({
  handleInputChange,
  isLoading,
  handleSubmit,
  reload,
  input,
}: ChatInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const counterRef = useRef(0);
  useEffect(() => {
    counterRef.current++;
    console.log("Chat input re rendered: ", counterRef.current);
  }, []);

  useEffect(() => {
    console.log("Files changed: ", files);
  }, [files]);

  const handleChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileDataPromises = files?.map((file) => convertFileToBase64(file));
    const fileData = await Promise.all(fileDataPromises);

    const data: Record<string, string> = {
      text: input,
      files: JSON.stringify(fileData),
    };

    const chatRequestOptions: ChatRequestOptions = {
      data: data,
    };

    handleSubmit(e, chatRequestOptions);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const dummyEvent = {
        preventDefault: () => {},
        currentTarget: formRef.current,
      } as unknown as FormEvent<HTMLFormElement>; // Casting to match expected type
      handleSubmit(dummyEvent); // Directly call the handleSubmit function
    }
  };

  const { isSidebarOpen } = useSidebarContext();

  return (
    <>
      <div className={`${files.length > 0 ? "mt-8" : ""}`}></div>
      <form
        ref={formRef}
        onSubmit={handleChatSubmit}
        className={`fixed inset-x-0 bottom-0 pb-4 bg-transparent transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <div className="container mx-auto flex flex-col items-center max-w-2xl relative">
          <FilePreviews files={files} setFiles={setFiles} />

          <Textarea
            onChange={handleInputChange}
            value={input}
            placeholder="Type a message..."
            className="h-12 min-h-[48px] max-h-[200px] outline-none border rounded-xl p-3 bg-slate-900 overflow-hidden resize-none placeholder:text-base text-base w-full px-[2.5rem]"
            onKeyDown={handleKeyDown}
          />

          {isLoading ? (
            <Loader2 className="animate-spin absolute right-10 bottom-3" />
          ) : (
            <button className="absolute right-10 bottom-3 z-50" type="submit">
              <Send />
            </button>
          )}

          <UploadFiles
            className="absolute left-10 bottom-3"
            setFiles={setFiles}
          />
        </div>
      </form>
    </>
  );
};

export default ChatInput;
