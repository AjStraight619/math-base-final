import { getDashboardData } from "@/actions/dashboardActions";
import { Header } from "@/components/dashboard-page/header";
import Items from "@/components/dashboard-page/items";
import { DashboardItems } from "@/lib/types";

type DashboardPageProps = {
  searchParams: {
    search: string;
  };
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  let items = await getDashboardData();
  const query = searchParams?.search;
  console.log(query);

  const filteredItems = filterItems(items, query);

  return (
    <main className="flex flex-col items-center justify-center h-full w-full pb-8 md:pb-6">
      <Header />
      <Items items={filteredItems} />
    </main>
  );
}

const filterItems = (items: DashboardItems, query: string) => {
  if (!query) {
    return items;
  }
  const filteredChats = items.chats.filter((chat) => {
    return chat.title.toLowerCase().includes(query.toLowerCase());
  });

  const filteredFolders = items.folders.filter((folder) => {
    return folder.title.toLowerCase().includes(query.toLowerCase());
  });
  return {
    ...items,
    chats: filteredChats,
    folders: filteredFolders,
    error: null,
  };
};
