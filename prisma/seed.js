const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to delete all chats for a specific user
const deleteAllChats = async (userId) => {
  await prisma.$transaction(async (prisma) => {
    // Delete all ChatMessages related to the user's chats
    await prisma.chatMessage.deleteMany({
      where: {
        chat: {
          userId: userId,
        },
      },
    });

    // Delete all chats for the user
    await prisma.chat.deleteMany({
      where: {
        userId: userId,
      },
    });
  });
};

// Function to delete all notes for a specific user
const deleteAllNotes = async (userId) => {
  await prisma.$transaction(async (prisma) => {
    // Delete all NoteContents related to the user's notes
    await prisma.noteContent.deleteMany({
      where: {
        note: {
          userId: userId,
        },
      },
    });

    // Delete all notes for the user
    await prisma.note.deleteMany({
      where: {
        userId: userId,
      },
    });
  });
};


async function createTags() {
    const tags = ['calculus', 'algebra', 'geometry', 'trigonometry', 'statistics'];
    for (const title of tags) {
      await prisma.tag.upsert({
        where: { title },
        update: {},
        create: { title },
      });
    }
  }
  
  async function seedFoldersAndNotes(userId) {
    for (let i = 1; i <= 5; i++) {
      const folder = await prisma.folder.create({
        data: {
          userId,
          title: `Folder ${i}`,
        },
      });
  
      for (let j = 1; j <= 4; j++) {
        const note = await prisma.note.create({
          data: {
            userId,
            title: `Note ${j} for Folder ${i}`,
            folderId: folder.id,
            tags: {
              connect: [{ title: 'calculus' }, { title: 'algebra' }], // Example: Connect to some tags
            },
            contents: {
              create: [
                {
                  content: `This is a LaTeX content for Note ${j}. \\[\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\\]`,
                  type: 'text',
                },
              ],
            },
          },
        });
      }
    }
  }
  
  async function seedChats(userId) {
    for (let i = 1; i <= 5; i++) {
      const chat = await prisma.chat.create({
        data: {
          userId,
          title: `Chat ${i}`,
          messages: {
            create: [
              {
                content: `Hello, this is a user message in Chat ${i}.`,
                role: 'user',
              },
              {
               
                content: `Sure, let's discuss \\(x^2 + y^2 = z^2\\) in Chat ${i}.`,
                role: 'assistant',
              },
            ],
          },
        },
      });
    }
  }



async function main() {
  // Example usage
  const userId = 'kp_cc11a79f89874a8b9ab12aa68afab12d'; // Replace with the actual user ID
//   await deleteAllChats(userId);
//   await deleteAllNotes(userId);
//   console.log('Deleted all chats and notes for user:', userId);

await createTags();
  await seedFoldersAndNotes(userId);
  await seedChats(userId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});