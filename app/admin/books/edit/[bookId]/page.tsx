import BackButton from "@/components/admin/BackButton";
import BookForm from "@/components/admin/forms/BookForm";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditBookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (!book) return notFound();
  return (
    <>
      <BackButton />

      <section className="w-full max-w-2xl">
        <BookForm {...book} type="UPDATE" />
      </section>
    </>
  );
};

export default EditBookPage;
