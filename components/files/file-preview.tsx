import { FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type FilePreviewProps = {
  file: File;
  handleRemoveFile: () => void;
};

const FilePreview = ({ file, handleRemoveFile }: FilePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  }, [file]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="relative">
      {file.type.startsWith("image/") ? (
        <Image
          src={imageUrl as string}
          alt={file.name}
          className=""
          width={60}
          height={60}
        />
      ) : (
        <span>{getFilePreview(file)}</span>
      )}
      <button
        onClick={handleRemoveFile}
        className="absolute top-0 right-0 p-1 bg-backround rounded-full"
      >
        <span className="sr-only">Remove file</span>
        <span>
          <X size={15} />
        </span>
      </button>
    </div>
  );
};

export default FilePreview;

const getFilePreview = (file: File) => {
  return (
    <div className="flex flex-row max-w-[12rem] max-h-[4rem] bg-background border rounded-md p-2 gap-1 z-[999]">
      <div className="p-2 rounded-md bg-red-400">
        <FileText className="h-full" />
      </div>
      <div className="flex flex-col items-start justify-between p-2 h-full w-full overflow-x-hidden">
        <span className="font-semibold text-sm">PDF</span>
        <span className="text-xs truncate">{file.name}</span>
      </div>
    </div>
  );
};
