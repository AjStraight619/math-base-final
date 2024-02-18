"use client";

import { Paperclip } from "lucide-react";
import { SetStateAction, useRef } from "react";

type UploadFilesProps = {
  className?: string;
  setFiles: React.Dispatch<SetStateAction<File[]>>;
};

const UploadFiles = ({ className, setFiles }: UploadFilesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (fileList: FileList | null) => {
    if (fileList) {
      const newFiles = Array.from(fileList);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <>
      <Paperclip
        onClick={() => inputRef?.current?.click()}
        className={`${className} hover:cursor-pointer text-primary/70 hover:text-primary transition-colors duration-100`}
      />
      <input
        ref={inputRef}
        hidden
        type="file"
        multiple
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </>
  );
};

export default UploadFiles;
