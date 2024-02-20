import { useSidebarContext } from "@/context/sidebar-context";

type SidebarMobileProps = {
  children: React.ReactNode;
};

const SidebarMobile = ({ children }: SidebarMobileProps) => {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  return <div>SidebarMobile</div>;
};

export default SidebarMobile;
