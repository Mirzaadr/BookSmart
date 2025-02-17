import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

const LoadingPage = () => {
  return (
    <>
      <BookOverview.Skeleton />
      <BookList.Skeleton title="Latest Books" containerClassname="mt-28" />
    </>
  );
};

export default LoadingPage;
