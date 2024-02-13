import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
