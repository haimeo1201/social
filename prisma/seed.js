const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const alice = await prisma.user.create({
    data: {
      email: "alice@123",
      password: "$2a$10$NmM5.4RwQKjgSavmyaQaXedenpPeUffMAbtU04WVypVrXlZuV33yW",
      role: "ADMIN",
      name: "alice",
      profile: {
        create: {
          bio: "alice in",
          gender: "grill",
          age: 123,
          avatar: "https://picsum.photos/200",
          wallpaper: "https://picsum.photos/200",
        },
      },
      posts: {
        create: {
          content: "nho ban xinh xinh vl",
        },
      },
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: "bob@123",
      password: "$2a$10$NmM5.4RwQKjgSavmyaQaXedenpPeUffMAbtU04WVypVrXlZuV33yW",
      name: "bob",
      profile: {
        create: {
          bio: "bob in",
          gender: "boy",
          age: 123,
          avatar: "https://picsum.photos/200",
          wallpaper: "https://picsum.photos/200",
        },
      },
    },
  });
  const post = await prisma.post.createMany({
    data: [
      {
        content: "bla bla bla ",
        authorId: bob.id,
      },
      {
        content: " dit me alice",
        authorId: bob.id,
      },
      {
        content: " cai deo gi",
        authorId: alice.id,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
