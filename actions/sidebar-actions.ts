"use server";

import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { getUserId } from "./user-actions";

export const getSidebarMetaData = async () => {
  try {
    const userId = await getUserId();

    const [chats, notes] = await Promise.all([
      prisma.chat.findMany({
        where: { userId },
        select: { id: true, title: true },
      }),
      prisma.note.findMany({
        where: { userId },
        select: { id: true, title: true },
      }),
    ]);

    return { error: null, chats, notes };
  } catch (err) {
    const error = getErrorMessage(err);
    return { error, chats: [], notes: [] };
  }
};
