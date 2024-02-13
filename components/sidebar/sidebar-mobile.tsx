type SidebarMobileProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarMobile = ({ children, isOpen }: SidebarMobileProps) => {
  return <div>SidebarMobile</div>;
};

export default SidebarMobile;
