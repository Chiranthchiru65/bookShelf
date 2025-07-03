import * as React from "react";
import "./NavBar.scss";
import Logo from "../../assets/icons/Logo";
import { useState } from "react";
import { Search, UserRound } from "lucide-react";
import PrimaryBtn from "../primaryBtn/PrimaryBtn";
import type { Book } from "../../assets/dummyData/DummyData";
import { useNavigate } from "react-router-dom";
interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [newBookData, setNewBookData] = useState<Book>({
    id: crypto.randomUUID(), // This generates a unique ID
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
    console.log(showPopUp);
  };

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
            <div className="navbar__profile">
              <div className="navbar__profile-icon">
                <UserRound />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showPopUp && (
        <div className="mainPopUp" onClick={handlePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="popup__title">Add New Book</h2>
            <form>
              <div className="popup__container">
                <div className="popup-title">
                  <label>Title</label>
                  <input />
                </div>
              </div>
              <PrimaryBtn onClick={handlePopup} bgcolor="#007bff" color="white">
                Close
              </PrimaryBtn>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
