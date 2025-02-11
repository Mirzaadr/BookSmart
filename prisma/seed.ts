import { PrismaClient, Role } from "@prisma/client";
import dummyBooks from "../dummybooks.json";
import { config } from "dotenv";
import ImageKit from "imagekit";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

config({ path: ".env" });

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
const prisma = new PrismaClient();

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

async function uploadToImageKit(url: string, fileName: string, folder: string) {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName: fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error);
    throw error;
  }
}

async function main() {
  await prisma.$connect();
  console.log("Seeding database...");
  // User
  const userAdmin = await prisma.user.create({
    data: {
      password: "$2a$10$1.l4xAnNalrU7Yj8fnMTGO0ZcoxuRM0P.w1ROk6YcszE6ykCGuXhW", // password123
      fullName: "Admin 1",
      email: "admin1@mail.com",
      universityId: 1,
      universityCard: "",
      // emailVerified: new Date().toISOString(),
      role: Role.ADMIN,
    },
  });
  const userRegular = await prisma.user.create({
    data: {
      password: "$2a$10$1.l4xAnNalrU7Yj8fnMTGO0ZcoxuRM0P.w1ROk6YcszE6ykCGuXhW", // password123
      fullName: "User 1",
      email: "user1@mail.com",
      universityId: 2,
      universityCard: "",
      // emailVerified: new Date().toISOString(),
      role: Role.USER,
    },
  });

  // Books
  for (const book of dummyBooks) {
    const coverUrl = await uploadToImageKit(
      book.coverUrl,
      `${book.title}.jpg`,
      "/books/covers"
    );

    const videoUrl = await uploadToImageKit(
      book.videoUrl,
      `${book.title}.mp4`,
      "/books/videos"
    );

    await prisma.book.create({
      data: {
        ...book,
        coverUrl,
        videoUrl,
      },
    });

    console.log(`Added book: ${book.title}`);
  }

  console.log("Seeding completed successfully.");
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
