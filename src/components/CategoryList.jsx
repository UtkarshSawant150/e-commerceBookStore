import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryList = () => {
  const category = useParams();

  const addClass = function (text) {
    const list = document.querySelectorAll(".list-group-item");
    if (!text.category) text = { category: "All" };
    for (let i of list) {
      i.classList.remove("active");
      if (i.innerText === text.category) {
        i.classList.add("active");
      }
    }
  };
  useEffect(() => {
    addClass(category);
  }, []);
  return (
    <>
      <div className="list-group category-list">
        <a
          href="/books"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          All
        </a>
        <a
          href="/books/Action & Adventure"
          className="list-group-item list-group-item-action"
        >
          Action & Adventure
        </a>
        <a
          href="/books/Arts, Films & Photography"
          className="list-group-item list-group-item-action"
        >
          Arts, Films & Photography
        </a>
        <a
          href="/books/Biographies, Diaries & True Accounts"
          className="list-group-item list-group-item-action"
        >
          Biographies, Diaries & True Accounts
        </a>
        <a
          href="/books/Business & Economics"
          className="list-group-item list-group-item-action"
        >
          Business & Economics
        </a>
        <a
          href="/books/Computer & Internet"
          className="list-group-item list-group-item-action"
        >
          Computer & Internet
        </a>
        <a
          href="/books/Crafts, Hobbies & Home"
          className="list-group-item list-group-item-action"
        >
          Crafts, Hobbies & Home
        </a>
        <a
          href="/books/Crime, Thriller & Mystery"
          className="list-group-item list-group-item-action"
        >
          Crime, Thriller & Mystery
        </a>
        <a
          href="/books/Engineering"
          className="list-group-item list-group-item-action"
        >
          Engineering
        </a>
        <a
          href="/books/Science Fiction & Fantasy"
          className="list-group-item list-group-item-action"
        >
          Science Fiction & Fantasy
        </a>
        <a
          href="/books/Health, Fitness & Nutrition"
          className="list-group-item list-group-item-action"
        >
          Health, Fitness & Nutrition
        </a>
        <a
          href="/books/Historical Fiction"
          className="list-group-item list-group-item-action"
        >
          Historical Fiction
        </a>
        <a
          href="/books/History"
          className="list-group-item list-group-item-action"
        >
          History
        </a>
        <a
          href="/books/Literature & Fiction"
          className="list-group-item list-group-item-action"
        >
          Literature & Fiction
        </a>
        <a
          href="/books/Religion & Spirituality"
          className="list-group-item list-group-item-action"
        >
          Religion & Spirituality
        </a>
        <a
          href="/books/Romance"
          className="list-group-item list-group-item-action"
        >
          Romance
        </a>
        <a
          href="/books/Sports"
          className="list-group-item list-group-item-action"
        >
          Sports
        </a>
        <a
          href="/books/Teen & Young Adult"
          className="list-group-item list-group-item-action"
        >
          Teen & Young Adult
        </a>
        <a
          href="/books/Travel & Tourism"
          className="list-group-item list-group-item-action"
        >
          Travel & Tourism
        </a>
      </div>
    </>
  );
};

export default CategoryList;
