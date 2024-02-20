type SidebarItemProps = {
  item: {
    id: string;
    title: string;
  };
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  return (
    <div className="relative flex-grow">
      <p className="text-sm text-primary/70 text-clip whitespace-nowrap overflow-hidden">
        {item.title}
      </p>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-[yourBackgroundColor]"></div>
    </div>
  );
};

export default SidebarItem;
