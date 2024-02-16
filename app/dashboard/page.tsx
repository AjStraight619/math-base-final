import { Header } from "@/components/dashboard-page/header";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <main className="flex flex-col items-center justify-center h-full w-full md:pl-14 overflow-hidden">
      <Header />
    </main>
  );
}
