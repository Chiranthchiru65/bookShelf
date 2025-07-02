import * as React from "react";
import { useParams } from "react-router-dom";

import { books } from "../../assets/dummyData/DummyData";
interface BookDetailsProps {}

const BookDetails: React.FunctionComponent<BookDetailsProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  const book = books.find((book) => createSlug(book.title) === slug);

  return <>{book ? <div>{book.title}</div> : <div>Book not found.</div>}</>;
};

export default BookDetails;
