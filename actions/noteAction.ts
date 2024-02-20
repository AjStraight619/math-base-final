"use server";

import { prisma } from "@/lib/prisma";

export const getNoteById = async (noteId: string) => {
  const noteById = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    include: {
      contents: true,
    },
  });
  return noteById;
};

export const deleteNote = async (noteId: string) => {
  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
};
