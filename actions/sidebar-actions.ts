"use server";

import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getUserId } from "./user-actions";

export const getSidebarMetaData = async () => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "User not found", chats: [], notes: [] };
    const [chats, notes] = await Promise.all([
      prisma.chat.findMany({
        where: { userId },
        select: { id: true, title: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.note.findMany({
        where: { userId },
        select: { id: true, title: true },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    return { error: null, chats, notes };
  } catch (err) {
    const error = getErrorMessage(err);
    return { error, chats: [], notes: [] };
  } finally {
    revalidatePath("/", "layout");
  }
};

/**
 * Deletes an item (chat or note) and its associated properties from the database.
 * This function uses a Prisma transaction to ensure that all related records (messages for chats,
 * contents for notes, and any tag relations) are deleted atomically. If any part of the deletion
 * process fails, the entire operation is rolled back to prevent partial deletions and maintain
 * database integrity.
 *
 * @param {string} id The unique identifier of the item to be deleted.
 * @param {"chat" | "note"} type The type of the item to be deleted, indicating whether it is a chat or a note.
 * @returns {Promise<void>} A promise that resolves when the deletion operation is complete. The promise
 * does not return any value.
 */

export const deleteItem = async (id: string, type: "chat" | "note") => {
  try {
    if (type === "chat") {
      await prisma.$transaction(async (prisma) => {
        await prisma.chatMessage.deleteMany({ where: { chatId: id } });

        await prisma.chatTags.deleteMany({ where: { chatId: id } });

        await prisma.chat.delete({ where: { id } });
      });
      return {
        success: true,
        error: null,
      };
    } else if (type === "note") {
      await prisma.$transaction(async (prisma) => {
        await prisma.noteContent.deleteMany({ where: { noteId: id } });

        await prisma.noteTags.deleteMany({ where: { noteId: id } });

        await prisma.note.delete({ where: { id } });
      });
      return {
        success: true,
        error: null,
      };
    }
  } catch (err) {
    console.error("Error deleting item: ", err);
    const error = getErrorMessage(err);
    return {
      success: false,
      error,
    };
  } finally {
    revalidatePath("/", "layout");
  }
};
