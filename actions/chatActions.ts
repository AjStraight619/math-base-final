"use serever";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getUserId } from "./user-actions";

export const newChat = async (formData: FormData) => {
  const userId = (await getUserId()) as unknown as string;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userId,
        title: "New Chat",
      },
    });
    console.log("New chat created: ", newChat);
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      success: false,
      error,
    };
  } finally {
    revalidatePath("/");
  }
};
