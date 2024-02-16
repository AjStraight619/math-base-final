import { getUserId } from "@/actions/user-actions";
import TextEditorNoSSR from "@/components/note-page/dynamic-editor";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getTestNote = async (userId: string | undefined) => {
  const note = await prisma.note.findFirst({
    where: {
      userId,
    },
    include: {
      contents: true,
    },
  });

  return note;
};

export type TestNote = {
  note: Prisma.PromiseReturnType<typeof getTestNote>;
};

export default async function NotePage() {
  const userId = await getUserId();
  const note = await getTestNote(userId);

  return (
    <main className="flex items-center justify-center p-8 mx-auto">
      <TextEditorNoSSR note={note} />
    </main>
  );
}
