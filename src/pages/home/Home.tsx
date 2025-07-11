import * as React from "react";
import { useState, useEffect } from "react";
import type { Book } from "../../assets/dummyData/DummyData";
import "./Home.scss";
interface HomeProps {}
import { books } from "../../assets/dummyData/DummyData";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../utils/LocalStorage";
import { Circle, Heart } from "lucide-react";

const Home: React.FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const stats = {
    total: booksData.length,
    reading: booksData.filter((book) => book.status === "reading").length,
    favorites: booksData.filter((book) => book.isFavorite).length,
    finished: booksData.filter((book) => book.status === "finished").length,
  };

  const loadBooks = () => {
    const books = getBooks();
    setBooksData(books);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      loadBooks();
    };

    window.addEventListener("booksChanged", handleStorageChange);

    return () => {
      window.removeEventListener("booksChanged", handleStorageChange);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to-read":
        return (
          <>
            <Circle fill="#f70000" />
          </>
        );
      case "reading":
        return (
          <>
            <Circle fill="#eeff00" />
          </>
        );
      case "finished":
        return (
          <>
            <Circle fill="#00e600" />
          </>
        );
      default:
        return (
          <>
            <Circle fill="#003cbd" />
          </>
        );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "to-read":
        return "To-read";
      case "reading":
        return "Reading";
      case "finished":
        return "Finished";
      default:
        return status;
    }
  };

  const getFilteredBooks = () => {
    let result = booksData;

    if (activeFilter === "to-read") {
      result = result.filter((book) => book.status === "to-read");
    } else if (activeFilter === "reading") {
      result = result.filter((book) => book.status === "reading");
    } else if (activeFilter === "finished") {
      result = result.filter((book) => book.status === "finished");
    }

    if (selectedGenre !== "all") {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    if (showFavorites === true) {
      result = result.filter((book) => book.isFavorite === true);
    }

    return result;
  };

  const filteredBooks = getFilteredBooks();

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__stats">
          <div className="stat-card">
            <h3>Total Books</h3>
            <div className="stat-number">{stats.total}</div>
          </div>
          <div className="stat-card">
            <h3>Currently Reading</h3>
            <div className="stat-number">{stats.reading}</div>
          </div>
          <div className="stat-card">
            <h3>Favorites</h3>
            <div className="stat-number">{stats.favorites}</div>
          </div>
          <div className="stat-card">
            <h3>Finished</h3>
            <div className="stat-number">{stats.finished}</div>
          </div>
        </div>
        <div className="home__filters">
          <div className="filters-left">
            <select
              className="genre-filter"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="all">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Self-Help">Self-Help</option>
            </select>
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "to-read" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("to-read")}
            >
              to-read
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "reading" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("reading")}
            >
              reading
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "finished" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("finished")}
            >
              finished
            </button>
          </div>
          <div className="filters-right">
            <span>Show Favorites</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={showFavorites}
                onChange={(e) => setShowFavorites(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        {/* books grid */}
        <div className="home__books">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => {
                navigate(`/${book.id}`);
              }}
            >
              <div className="book-card__cover">
                <div className="book-placeholder">
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    className="book-card__img"
                  />
                </div>
              </div>
              <div className="book-card__info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">{book.author}</p>
                <span className="book-genre">{book.genre}</span>
                <div className="book-card__footer">
                  <div className="book-status">
                    <span className="status-icon">
                      {getStatusIcon(book.status)}
                    </span>
                    <span className="status-text">
                      {getStatusText(book.status)}
                    </span>
                  </div>
                  {book.isFavorite && (
                    <div className="book-actions">
                      <button className="action-btn">
                        <Heart fill="red" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
