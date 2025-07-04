import * as React from "react";
import "./NavBar.scss";
import Logo from "../../assets/icons/Logo";
import { useState } from "react";
import { Search, UserRound } from "lucide-react";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import type { Book } from "../../assets/dummyData/DummyData";
import { useNavigate, useLocation } from "react-router-dom";
import { addBook } from "../../utils/LocalStorage";

interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isBookDetailsPage = location.pathname !== "/";
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [newBookData, setNewBookData] = useState<Book>({
    id: crypto.randomUUID(),
    title: "",
    author: "",
    genre: undefined,
    publishedYear: undefined,
    coverImage: undefined,
    isRead: false,
    isFavorite: false,
    createdAt: new Date().toISOString(),
    status: "to-read",
    description: undefined,
    tags: undefined,
    readingProgress: undefined,
  });

  const handlePopup = () => {
    setShowPopUp((showPopUp) => !showPopUp);
    if (showPopUp) {
      setNewBookData({
        id: crypto.randomUUID(),
        title: "",
        author: "",
        genre: undefined,
        publishedYear: undefined,
        coverImage: undefined,
        isRead: false,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        status: "to-read",
        description: undefined,
        tags: undefined,
        readingProgress: undefined,
      });
      setSelectedImage(null);
    }
  };

  const handleInputChange = (
    field: keyof Book,
    value: string | number | Book["genre"] | Book["status"]
  ) => {
    setNewBookData((prev) => ({
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
        setNewBookData((prev) => ({
          ...prev,
          coverImage: imageUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!newBookData.title.trim()) {
      alert("enter book title");
      return;
    }

    if (!newBookData.author.trim()) {
      alert("enter  author name");
      return;
    }

    if (!newBookData.genre) {
      alert("select genre");
      return;
    }

    if (!newBookData.publishedYear) {
      alert("enter published year");
      return;
    }

    if (!newBookData.coverImage) {
      alert("select cover image");
      return;
    }

    if (!newBookData.description?.trim()) {
      alert("enter description");
      return;
    }

    console.log(" book:", newBookData);
    addBook(newBookData);

    window.dispatchEvent(new CustomEvent("booksChanged"));

    handlePopup();
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

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container ">
          <div
            className="navbar__logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="navbar__logo-icon">
              <Logo size={34} />
            </div>
            <span className="navbar__logo-text">BookShelf Manager</span>
          </div>

          {!isBookDetailsPage && (
            <>
              <div className="navbar__search">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="navbar__search-input"
                />
                <button className="navbar__search-btn">
                  <Search />
                </button>
              </div>

              <div className="navbar__actions">
                <button className="navbar__add-book" onClick={handlePopup}>
                  Add New Book
                </button>
                {/* <div className="navbar__profile">
              <div className="navbar__profile-icon">
              <UserRound />
              </div>
              </div> */}
              </div>
            </>
          )}
        </div>
      </nav>

      {showPopUp && (
        <div className="mainPopUp" onClick={handlePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup__title">Add Book</h2>

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
                      value={newBookData.title}
                      required
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
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
                      value={newBookData.author}
                      required
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label">
                      Genre <span className="required">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={newBookData.genre || ""}
                      required
                      onChange={(e) =>
                        handleInputChange(
                          "genre",
                          e.target.value as Book["genre"]
                        )
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
                      value={newBookData.publishedYear || ""}
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
                          required
                          checked={newBookData.status === "to-read"}
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
                          required
                          checked={newBookData.status === "reading"}
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
                          required
                          checked={newBookData.status === "finished"}
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
                      required
                      value={newBookData.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-group form-group--right">
                  <div className="image-section">
                    <label className="form-label">
                      Cover Image <span className="required">*</span>
                    </label>
                    <div className="image-preview">
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Book cover preview"
                          className="preview-image"
                        />
                      ) : (
                        <div className="no-image">No image selected</div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: "none" }}
                      required
                    />
                    <PrimaryBtn
                      bgcolor="#007bff"
                      color="white"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      Select Image *
                    </PrimaryBtn>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <PrimaryBtn
                  bgcolor="#007bff"
                  color="white"
                  onClick={handleSave}
                >
                  Save
                </PrimaryBtn>
                <PrimaryBtn
                  bgcolor="#6c757d"
                  color="white"
                  onClick={handlePopup}
                >
                  Cancel
                </PrimaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
