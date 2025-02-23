import BackButton from "@/components/admin/BackButton";
import BookForm from "@/components/admin/forms/BookForm";

const NewBookPage = () => {
  return (
    <>
      <BackButton />

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};

export default NewBookPage;
