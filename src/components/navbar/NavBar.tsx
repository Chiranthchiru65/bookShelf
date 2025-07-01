import * as React from "react";
import "./NavBar.scss";
import Logo from "../../assets/icons/Logo";
import { Search, UserRound } from "lucide-react";
interface NavBarProps {}

const NavBar: React.FunctionComponent<NavBarProps> = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
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
          <button className="navbar__add-book">Add New Book</button>
          <div className="navbar__profile">
            <div className="navbar__profile-icon">
              <UserRound />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
