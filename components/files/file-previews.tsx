import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import FilePreview from "./file-preview";

type FilePreviewsProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const variants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
};

const FilePreviews = ({ files, setFiles }: FilePreviewsProps) => {
  const handleRemoveFile = useCallback(
    (filename: string) => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== filename)
      );
    },
    [setFiles]
  );

  return (
    <AnimatePresence>
      <motion.ul className="list-none flex flex-row items-end justify-start mb-2 gap-2 w-full">
        {files.map((file) => (
          <motion.li
            key={file.name}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <FilePreview
              file={file}
              handleRemoveFile={() => handleRemoveFile(file.name)}
            />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default FilePreviews;
