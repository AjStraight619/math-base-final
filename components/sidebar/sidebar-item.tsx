type SidebarItemProps = {
  item: {
    id: string;
    title: string;
  };
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between">
      {item.title}
    </div>
  );
};

export default SidebarItem;
