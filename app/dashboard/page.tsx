import { getUserId } from "@/actions/user-actions";
import { Header } from "@/components/dashboard-page/header";
import Items from "@/components/dashboard-page/items";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

export const getDashboardData = async () => {
  const userId = (await getUserId()) as unknown as string;

  try {
    const [chats, folders] = await Promise.all([
      prisma.chat.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          messages: {
            orderBy: {
              updatedAt: "desc",
            },
            take: 1,
          },
        },
      }),

      prisma.folder.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          notes: {
            orderBy: {
              updatedAt: "desc",
            },
            take: 1,
          },
        },
      }),
    ]);

    return { error: null, chats, folders };
  } catch (err) {
    const error = getErrorMessage(err);
    return { error, chats: [], folders: [] };
  }
};

export default async function DashboardPage() {
  const items = await getDashboardData();
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <Header />
      <Items items={items} />
    </main>
  );
}
