import * as React from "react";
import { useState } from "react";
import "./Home.scss";
interface HomeProps {}

import { books } from "../../assets/dummyData/DummyData";

const Home: React.FunctionComponent<HomeProps> = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const stats = {
    total: books.length,
    reading: books.filter((book) => book.status === "reading").length,
    favorites: books.filter((book) => book.isFavorite).length,
    finished: books.filter((book) => book.status === "finished").length,
  };

  return (
    <div className="home">
      <div className="home__container">
        {/* cards status */}
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
        {/* filter section */}
        <div className="home__filters">
          <div className="filters-left">
            <select className="genre-filter">
              <option>Genre </option>
              <option>All</option>
              <option>Classic Fiction</option>
              <option>Science Fiction</option>
              <option>Mystery</option>
            </select>
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
        {showFavorites ? <>fav book</> : <p>{activeFilter}</p>}
      </div>
    </div>
  );
};

export default Home;
