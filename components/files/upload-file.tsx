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

  const handleClick = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <Paperclip
        onClick={handleClick}
        className={`${className} hover:cursor-pointer text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-100`}
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