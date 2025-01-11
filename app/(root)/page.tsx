import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const RootPage = () => {
  return (
    <>
      <BookOverview 
        {...sampleBooks[0]}
      />

      <BookList 
        title="Latest Books"
        books={sampleBooks}
        containerClassname="mt-28"
      />
    </>
  )
}

export default RootPage;