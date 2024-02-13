import SidebarItem from "./sidebar-item";

type SidebarItemsProps = {
  items: {
    id: string;
    title: string;
  }[];
};

const SidebarItems = ({ items }: SidebarItemsProps) => {
  const handleItemDelete = async (id: string) => {};

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <SidebarItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default SidebarItems;
