import { usePathname } from "next/navigation";

export const useId = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return id;
};
