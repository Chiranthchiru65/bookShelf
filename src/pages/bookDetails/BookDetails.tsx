import * as React from "react";
import { useParams, Link } from "react-router-dom";
// import { books } from "../../assets/dummyData/DummyData";
import PrimaryBtn from "../../components/primaryBtn/PrimaryBtn";
import "./BookDetails.scss";
import { ChevronRight } from "lucide-react";
import { deleteBook, getBooks } from "../../utils/LocalStorage";
interface BookDetailsProps {}

const BookDetails: React.FunctionComponent<BookDetailsProps> = () => {
  const { slug } = useParams<{ slug: string }>();

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  const books = getBooks();
  const book = books.find((book) => createSlug(book.title) === slug);

  if (!book) {
    return (
      <div className="details">
        <div className="details__container">
          <p>Book not found</p>
        </div>
      </div>
    );
  }

  const handleDelete = (id: string) => {
    deleteBook(id);
  };

  return (
    <div className="details">
      <div className="details__container">
        {/* breadcrumb Nav */}
        <nav className="details__breadcrumb">
          <Link to="/" className="details__breadcrumb-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="details__breadcrumb-separator">
            <ChevronRight />
          </span>

          <span className="details__breadcrumb-current">Book Details</span>
        </nav>

        {/* main  content*/}
        <div className="details__content">
          <div className="details__cover">
            <div className="details__cover-image">
              <img
                src={book.coverImage}
                alt={`${book.title} by ${book.author}`}
                className="details__cover-img"
              />
            </div>
          </div>

          <div className="details__info">
            <h1 className="details__title">{book.title}</h1>
            <h2 className="details__author">{book.author}</h2>
            <p className="details__genre">{book.genre}</p>
            <p className="details__published">
              Published: {book.publishedYear}
            </p>

            <div className="details__status">
              <div className="details__status-item ">
                <input type="radio" />
                <span>Finished</span>
              </div>
              <div className="details__status-item">
                <input type="radio" />
                <span>Mark as Read</span>
              </div>
            </div>

            <div className="details__actions">
              <PrimaryBtn bgcolor="#4285f4" color="white">
                Edit Book
              </PrimaryBtn>
              <button
                className="details__delete-btn"
                onClick={() => handleDelete(book.id)}
              >
                Delete Book
              </button>
              <button className="details__reading-btn">Mark as Reading</button>
            </div>
          </div>
        </div>
        <div className="details__description">
          <h3 className="details__description-title">Description / Notes</h3>
          <p className="details__description-text">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
