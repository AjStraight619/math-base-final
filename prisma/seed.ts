const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserId = async () => {
  const user = await prisma.user.findFirst();
  return user?.id;
};

async function main() {
  const note = await prisma.note.create({
    data: {
      userId: (await getUserId()) as unknown as string,
      title: "Sample Note with LaTeX",
      contents: {
        create: [
          { type: "text", content: "This is a regular text content." },
          {
            type: "text",
            content:
              "Here is some LaTeX: $\\frac{a}{b}$ and $$\\sum_{n=1}^{\\infty} 2^{-n} = 1$$.",
          },
        ],
      },
    },
  });
  console.log("Seeding db with note: ", note);
  for (let i = 0; i < 10; i++) {
    const chat = await prisma.chat.create({
      data: {
        userId: (await getUserId()) as unknown as string,
        title: `Sample Chat ${i}`,
        messages: {
          create: [
            { role: "user", content: "Hello" },
            { role: "assistant", content: "Hi there!" },
          ],
        },
      },
    });
  }

  console.log("Seeding db with 10 chats");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
