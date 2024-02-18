"use server";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getUserId } from "./user-actions";

export const newChat = async (formData: FormData) => {
  const userId = (await getUserId()) as unknown as string;
  console.log("In new chat action");

  try {
    const newChat = await prisma.chat.create({
      data: {
        userId,
        title: "New Chat",
      },
    });
    console.log("New chat created: ", newChat);
    revalidatePath("/");
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const deleteChat = async (chatId: string) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.chatMessage.deleteMany({
        where: {
          chatId,
        },
      });
      await prisma.chat.delete({
        where: {
          id: chatId,
        },
      });
    });
    revalidatePath("/");
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const EditChat = async (formData: FormData) => {
  console.log("In edit chat action");
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log("Title: ", title);

  try {
    await prisma.chat.update({
      where: {
        id,
      },
      data: {
        title,
        messages: {},
      },
    });
    revalidatePath("/");
    return {
      success: true,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};
