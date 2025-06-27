import React, { useEffect, useState } from "react";
import CategoryOptions from "../components/CategoryOptions";
import Card from "../components/Card";
import imgsrc from "../images/books-logo.jpg";
import { useDispatch } from "react-redux";
// import { login } from "../store/slice";
import { useParams, useSearchParams } from "react-router-dom";
import NotFound from "../components/NotFound";

const Books = (props) => {
  // const dispatch = useDispatch();
  const [booksData, setBooksData] = useState([]);
  const [searchParams] = useSearchParams();
  const { category } = useParams();

  const callBooksPage1 = async () => {
    try {
      const res = await fetch(`https://bookish-bliss.onrender.com/books`);

      const data = await res.json();
      if (res.status === 200) {
        setBooksData(data);
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  const callBooksPage2 = async () => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/books/category/${category}`
      );

      const data = await res.json();
      if (res.status === 200) {
        setBooksData(data);
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  const callBooksPage3 = async () => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/books/search?name=${searchParams.get(
          "name"
        )}`
      );

      const data = await res.json();
      if (res.status === 200) {
        setBooksData(data);
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  useEffect(() => {
    if (props.pathName === "home") callBooksPage1();
    else if (props.pathName === "category") callBooksPage2();
    else if (props.pathName === "search") callBooksPage3();
  }, []);
  return (
    <>
      <div className="container-fluid mb-2">
        <div className="row books-heading">
          <div className="col-12">
            <img src={imgsrc} alt="logo" />
            <h1>Books</h1>
          </div>
        </div>
        <div className="row books-heading2">
          <div className="col-12 main_heading p-2">
            <button
              className="btn btn-primary d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-controls="offcanvasResponsive"
              style={{ background: "transparent", borderColor: "black" }}
            >
              <i className="fa-solid fa-bars" style={{ color: "black" }}></i>
            </button>

            <h2>Category - {category}</h2>
          </div>
        </div>
        <div className="row books-category">
          <div className="col-2 p-0 booklist">
            <CategoryOptions />
          </div>
          <div className="col-lg-10 col-12 p-0 books-list">
            {booksData.length ? (
              booksData.map((item) => {
                return <Card bookData={item} key={item._id} />;
              })
            ) : (
              <NotFound message="No Book Found" img="1" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
