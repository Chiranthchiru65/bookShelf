import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PrimaryBtn from "../../components/primaryBtn/PrimaryBtn";
import PopupModal from "../../components/popUpModal/popUpModal";
import "./BookDetails.scss";
import { ChevronRight } from "lucide-react";
import { deleteBook, getBooks, updateBook } from "../../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../assets/dummyData/DummyData";

interface BookDetailsProps {}

const BookDetails: React.FunctionComponent<BookDetailsProps> = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editBookData, setEditBookData] = useState<Book>({
    id: "",
    title: "",
    author: "",
    genre: undefined,
    publishedYear: undefined,
    coverImage: undefined,
    isRead: false,
    isFavorite: false,
    createdAt: "",
    status: "to-read",
    description: undefined,
    tags: undefined,
    readingProgress: undefined,
  });

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const loadCurrentBook = () => {
    const books = getBooks();
    const book = books.find((book) => book.id === slug);
    setCurrentBook(book || null);
  };

  useEffect(() => {
    loadCurrentBook();

    const handleBooksChange = () => {
      loadCurrentBook();
    };

    window.addEventListener("booksChanged", handleBooksChange);
    return () => window.removeEventListener("booksChanged", handleBooksChange);
  }, [slug]);

  const handleEditModal = () => {
    if (currentBook) {
      setEditBookData(currentBook);
      setSelectedImage(currentBook.coverImage || null);
      setShowEditModal(true);
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedImage(null);
    if (currentBook) {
      setEditBookData(currentBook);
    }
  };

  const handleInputChange = (
    field: keyof Book,
    value: string | number | Book["genre"] | Book["status"] | boolean
  ) => {
    setEditBookData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        setEditBookData((prev) => ({
          ...prev,
          coverImage: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  //  edit save
  const handleEditSave = () => {
    if (!editBookData.title.trim()) {
      alert("Please enter a book title");
      return;
    }
    if (!editBookData.author.trim()) {
      alert("Please enter an author name");
      return;
    }
    if (!editBookData.genre) {
      alert("Please select a genre");
      return;
    }
    if (!editBookData.publishedYear) {
      alert("Please enter a published year");
      return;
    }
    if (!editBookData.coverImage) {
      alert("Please select a cover image");
      return;
    }
    if (!editBookData.description?.trim()) {
      alert("Please enter a description");
      return;
    }

    const success = updateBook(editBookData.id, editBookData);
    if (success) {
      setShowEditModal(false);
      setSelectedImage(null);
    } else {
      alert("Failed to update book");
    }
  };

  //  delete fun
  const handleDelete = () => {
    if (currentBook) {
      const success = deleteBook(currentBook.id);
      if (success) {
        navigate("/");
      } else {
        alert("Failed to delete book");
      }
    }
  };

  const genreOptions: Book["genre"][] = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Other",
  ];

  if (!currentBook) {
    return (
      <div className="details">
        <div className="details__container">
          <p>Book not found</p>
        </div>
      </div>
    );
  }

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

        {/* main content */}
        <div className="details__content">
          <div className="details__cover">
            <div className="details__cover-image">
              <img
                src={currentBook.coverImage}
                alt={`${currentBook.title} by ${currentBook.author}`}
                className="details__cover-img"
              />
            </div>
          </div>

          <div className="details__info">
            <h1 className="details__title">{currentBook.title}</h1>
            <h2 className="details__author">{currentBook.author}</h2>
            <p className="details__genre">{currentBook.genre}</p>
            <p className="details__published">
              Published: {currentBook.publishedYear}
            </p>

            <div className="details__actions">
              <PrimaryBtn
                bgcolor="#4285f4"
                color="white"
                onClick={handleEditModal}
              >
                Edit Book
              </PrimaryBtn>
              <button
                className="details__delete-btn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>

        <div className="details__description">
          <h3 className="details__description-title">Description / Notes</h3>
          <p className="details__description-text">{currentBook.description}</p>
        </div>
      </div>

      {/* edit Modal */}
      <PopupModal
        isOpen={showEditModal}
        onClose={handleEditModalClose}
        title="Edit Book"
      >
        <form className="book-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group form-group--left">
              <div className="form-field">
                <label className="form-label">
                  Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter book title"
                  value={editBookData.title}
                  required
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Author <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter author name"
                  value={editBookData.author}
                  required
                  onChange={(e) => handleInputChange("author", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Genre <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  value={editBookData.genre || ""}
                  required
                  onChange={(e) =>
                    handleInputChange("genre", e.target.value as Book["genre"])
                  }
                >
                  <option value="">Select genre</option>
                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Published Year <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="YYYY"
                  min="1000"
                  max="2025"
                  value={editBookData.publishedYear || ""}
                  required
                  onChange={(e) =>
                    handleInputChange(
                      "publishedYear",
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Status <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="status"
                      value="to-read"
                      checked={editBookData.status === "to-read"}
                      onChange={(e) =>
                        handleInputChange(
                          "status",
                          e.target.value as Book["status"]
                        )
                      }
                    />
                    <span className="radio-custom"></span>
                    To-Read
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="status"
                      value="reading"
                      checked={editBookData.status === "reading"}
                      onChange={(e) =>
                        handleInputChange(
                          "status",
                          e.target.value as Book["status"]
                        )
                      }
                    />
                    <span className="radio-custom"></span>
                    Reading
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="status"
                      value="finished"
                      checked={editBookData.status === "finished"}
                      onChange={(e) =>
                        handleInputChange(
                          "status",
                          e.target.value as Book["status"]
                        )
                      }
                    />
                    <span className="radio-custom"></span>
                    Finished
                  </label>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="Enter description"
                  rows={4}
                  value={editBookData.description || ""}
                  required
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="form-group form-group--right">
              <div className="image-section">
                <div className="image-preview">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Book cover preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="no-image">No image</div>
                  )}
                </div>
                <input
                  type="file"
                  id="edit-image-upload"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
                <PrimaryBtn
                  bgcolor="#007bff"
                  color="white"
                  onClick={() =>
                    document.getElementById("edit-image-upload")?.click()
                  }
                >
                  Select Image *
                </PrimaryBtn>
              </div>
              <div className="form-field">
                <div className="favorites-toggle">
                  <span className="form-label">Add to Favorites</span>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={editBookData.isFavorite}
                      onChange={(e) =>
                        handleInputChange("isFavorite", e.target.checked)
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <PrimaryBtn
              bgcolor="#007bff"
              color="white"
              onClick={handleEditSave}
            >
              Save Changes
            </PrimaryBtn>
            <PrimaryBtn
              bgcolor="#6c757d"
              color="white"
              onClick={handleEditModalClose}
            >
              Cancel
            </PrimaryBtn>
          </div>
        </form>
      </PopupModal>

      {/* delete modal */}
      <PopupModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Book"
      >
        <div className="delete-confirmation">
          <p className="delete-message">Are you sure you want to delete? </p>

          <div className="delete-actions">
            <PrimaryBtn bgcolor="#dc2626" color="white" onClick={handleDelete}>
              Yes, Delete
            </PrimaryBtn>
            <PrimaryBtn
              bgcolor="#6c757d"
              color="white"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </PrimaryBtn>
          </div>
        </div>
      </PopupModal>
    </div>
  );
};

export default BookDetails;
