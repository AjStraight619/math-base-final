import Image from "next/image";
import { useState } from "react";
import UploadFiles from "../files/upload-file";
import { Textarea } from "../ui/textarea";

const ChatInput = () => {
  const [files, setFiles] = useState<File[]>([]);

  console.log("These are the files: ", files);

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

  return (
    <div className="fixed inset-x-0 bottom-0 pb-4 bg-transparent">
      <div className="container mx-auto flex flex-col items-center max-w-2xl relative">
        <div className="flex overflow-x-auto pb-2 w-full justify-start items-center">
          {renderFilePreviews()}
        </div>
        {/* Adjust the padding and height directly to control the Textarea's appearance */}
        <Textarea
          placeholder="Type a message..."
          className="h-12 min-h-[48px] max-h-[200px] outline-none border rounded-xl p-3 bg-slate-900 overflow-hidden resize-none placeholder:text-base text-base w-full px-[2.5rem]"
        />
        <UploadFiles
          className="absolute left-10 bottom-3" // Adjust based on the actual position needed
          setFiles={setFiles}
        />
      </div>
    </div>
  );
};

export default ChatInput;
