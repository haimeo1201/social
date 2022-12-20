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
          description: "ez game ez life",
          avatar: "http://localhost:8080/image/profile/noAvatar.png",
          wallpaper: "http://localhost:8080/image/profile/noCover.png",
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
          description: "yeu mau hong ghet su gia doi",
          avatar: "http://localhost:8080/image/profile/noAvatar.png",
          wallpaper: "http://localhost:8080/image/profile/noCover.png",
        },
      },
    },
  });
  const post = await prisma.post.create({
    data: {
      content: "nho ban xinh xinh vl",
      authorId: alice.id,
      comments: {
        create: {
          content: "nho ban xinh xinh vl",
          authorId: bob.id,
        },
      },
    },
  });
  const post2 = await prisma.post.create({
    data: {
      content: "dit me may",
      authorId: alice.id,
      comments: {
        create: {
          content: "nho ban xinh xinh vl",
          authorId: bob.id,
        },
      },
    },
  });
  const comment2 = await prisma.comment.create({
    data: {
      content: "nho ban xinh xinh vl",
      authorId: bob.id,
      postId: post2.id,
    },
  });
  const comment = await prisma.comment.create({
    data: {
      content: "nho ban xinh xinh vl",
      authorId: bob.id,
      postId: post.id,
    },
  });
  const like = await prisma.likes.create({
    data: {
      authorId: bob.id,
      postId: post.id,
    },
  });
  const like2 = await prisma.likes.create({
    data: {
      authorId: bob.id,
      postId: post2.id,
    },
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
