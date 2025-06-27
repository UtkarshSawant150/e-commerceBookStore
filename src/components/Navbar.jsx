import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import imgsrc from "../images/bookish-bliss-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/slice";

const Navbar = () => {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.logging);
  const logOutUser = async () => {
    try {
      const register = await fetch(
        "https://bookish-bliss.onrender.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            token: localStorage.getItem("token"),
          }),
        }
      );
      if (register.status === 200) {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/");
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  const handleChange = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    const callNavbar = async () => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/?token=${localStorage.getItem(
            "token"
          )}`
        );
        if (res.status === 200) {
          dispatch(login());
        }
      } catch (err) {
        console.error("Server Error.Refresh the page");
      }
    };
    if (localStorage.getItem("token")) {
      callNavbar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-white">
        <div className="container-fluid flex-column flex-lg-row align-items-start">
          <div className="mb-lg-0 mb-3 justify-content-between">
            <button
              className="navbar-toggler p-1"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand mr-lg-5" href="/">
              <img src={imgsrc} alt="" className="img-fluid brand-logo" />
            </a>
          </div>
          <form
            action={`/books/search`}
            className="d-flex btn-group"
            id="search-books"
            role="search"
          >
            <input
              className="form-control mt-1"
              type="search"
              placeholder="Search the name of the book"
              aria-label="Search"
              name="name"
              value={data}
              onChange={handleChange}
            />
            <button className="btn btn-outline-success mt-1" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <ul className="navbar-nav mb-2 mb-lg-0 justify-content-evenly w-100 nav_options">
              <li className="nav-item ">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link" to="/books">
                  Books
                </NavLink>
              </li>

              {!state.isLoggedIn ? (
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ paddingRight: "5px" }}
                    ></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item nav-link"
                        style={{
                          fontSize: "1em",
                          padding: "4px 8px",
                          letterSpacing: "1px",
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                        to="/profile"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="dropdown-item nav-link"
                        style={{
                          fontSize: "1em",
                          padding: "4px 8px",
                          letterSpacing: "1px",
                          color: "black",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                        to="/contact"
                      >
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <a
                        className="dropdown-item nav-link"
                        style={{
                          color: "red",
                          fontSize: "1em",
                          letterSpacing: "1px",
                          padding: "4px 8px",
                        }}
                        href="#"
                        onClick={logOutUser}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {state.isLoggedIn ? (
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                    <i className="fa-solid fa-cart-shopping"></i>
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
