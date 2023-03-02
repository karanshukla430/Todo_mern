import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../context/Appcontext";
import axios from "axios";
function Header() {
  const { setLoggedIn, isLoggedIn } = useContext(AppContext);
  useEffect(() => {
    if ("token" in localStorage) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn]);

  const loggingOut = async (e) => {
    if (isLoggedIn === true) {
      await axios.get("/api/v1/users/logout");
      localStorage.clear();
      setLoggedIn(false);
      toast.info("You loged out successfully");
    }
  };
  return (
    <>
      <header className="header">
        <div className="container container--narrow">
          <Link to="/">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <p style={{ fontSize: "16px", color: "white" }}>Todo List</p>
            </div>
          </Link>
          <nav className="header__nav">
            <input type="checkbox" id="responsive-menu" />
            <label htmlFor="responsive-menu" className="toggle-menu">
              <span>Menu</span>
              <div className="toggle-menu__lines"></div>
            </label>
            <ul className="header__menu">
              {isLoggedIn ? (
                <li className="header__menuItem">
                  <Link to="/account">Account</Link>
                </li>
              ) : (
                <p></p>
              )}
              <li className="header__menuItem">
                <Link to="/login" className="btn btn--sub" onClick={loggingOut}>
                  {isLoggedIn ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
