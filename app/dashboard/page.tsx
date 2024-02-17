import { getDashboardData } from "@/actions/dashboardActions";
import { Header } from "@/components/dashboard-page/header";
import Items from "@/components/dashboard-page/items";

export default async function DashboardPage() {
  const items = await getDashboardData();
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <Header />
      <Items items={items} />
    </main>
  );
}
