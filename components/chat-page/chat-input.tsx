import { ChatRequestOptions } from "ai";
import { Loader2, Send } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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

  const renderFilePreviews = () => {
    return files.map((file, index) => (
      <div key={index} className="mr-2">
        {file.type.startsWith("image/") ? (
          <Image
            src={URL.createObjectURL(file)}
            alt={file.name}
            className=""
            width={60}
            height={60}
          />
        ) : (
          <span>{file.name}</span>
        )}
      </div>
    ));
  };

  const getFileType = (file: File) => {
    if (file.type === "aplication/pdf") return;
  };

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

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       if (e.shiftKey) return;
  //       e.preventDefault();
  //       handleSubmit(new Event("submit"));
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // Create a dummy form event or pass null/undefined if handleSubmit can handle it
      const dummyEvent = {
        preventDefault: () => {},
        currentTarget: formRef.current,
      } as unknown as FormEvent<HTMLFormElement>; // Casting to match expected type
      handleSubmit(dummyEvent); // Directly call the handleSubmit function
    }
  };

  return (
    <>
      <div className={`${files.length > 0 ? "mt-8" : ""}`}></div>
      <form
        ref={formRef}
        onSubmit={handleChatSubmit}
        className={`fixed inset-x-0 bottom-0 pb-4 bg-transparent`}
      >
        <div className="container mx-auto flex flex-col items-center max-w-2xl relative">
          <div className="flex overflow-x-auto pb-2 w-full justify-start items-center">
            {renderFilePreviews()}
          </div>

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
