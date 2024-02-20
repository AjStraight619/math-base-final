import { usePathname } from "next/navigation";

export const usePath = () => {
  const pathname = usePathname();
  return pathname;
};
