import { Book, PrismaClient, Role, Status, User } from "@prisma/client";
import dummyBooks from "./data/dummybooks.json";
import dummyUsers from "./data/dummyUsers.json";
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

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
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
      universityId: 123434567,
      universityCard: "/ids/driver-license_UFXmqul5c.jpg",
      // emailVerified: new Date().toISOString(),
      status: "APPROVED",
      role: Role.ADMIN,
      lastActivityDate: new Date(),
    },
  });
  const userData = dummyUsers.map((user) => ({
    ...user,
    universityId: Number(user.universityId),
    status: user.status as Status,
    role: user.role as Role,
  }));
  await prisma.user.createMany({
    data: userData,
  });

  // Books
  for (const book of dummyBooks) {
    const coverUrl = await uploadToImageKit(
      book.coverUrl,
      `${book.title}.jpg`,
      "/books/covers"
    );

    // const videoUrl = await uploadToImageKit(
    //   book.videoUrl,
    //   `${book.title}.mp4`,
    //   "/books/videos"
    // );

    await prisma.book.create({
      data: {
        ...book,
        coverUrl,
        // videoUrl,
      },
    });

    console.log(`Added book: ${book.title}`);
  }

  // Borrow Records
  const users: User[] =
    await prisma.$queryRaw`SELECT * FROM users WHERE status = 'APPROVED' ORDER By random() LIMIT 20`;
  const books: Book[] =
    await prisma.$queryRaw`SELECT * FROM books ORDER By random() LIMIT 50`;

  for (let i = 1; i <= 35; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const book = books[Math.floor(Math.random() * books.length)];
    const borrowDate = randomDate(new Date(2024, 10, 20), new Date());
    const dueDate = addDays(borrowDate, 30);
    const returnDate =
      Math.random() > 0.8 ? randomDate(borrowDate, dueDate) : null;

    await prisma.borrowRecord.create({
      data: {
        userId: user.id,
        bookId: book.id,
        borrowDate: borrowDate,
        dueDate: dueDate,
        returnDate: returnDate,
        status: returnDate ? "RETURNED" : "BORROWED",
      },
    });
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
