import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, subtract } from "../store/slice/amount";

const BooksCart = (props) => {
  const [bookData, setBookData] = useState({});
  const [quantity, setQuantity] = useState(props.book.quantity);
  const state = useSelector((state) => state.amount);
  const dispatch = useDispatch();
  const href = "/book/" + bookData._id;

  const displayBook = async (book) => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/bookname?name=${props.book.bookname}`
      );
      const data = await res.json();
      if (res.status === 200) {
        setBookData(data[0]);
        if (!state.totalAmount)
          dispatch(
            add({
              price: data[0].sprice,
              qty: quantity,
            })
          );
        bookData.imgsrc = "/" + data.imgsrc;
      }
    } catch (error) {
      console.error("Server error");
    }
  };

  const addQuantity = async () => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/cart?name=${props.book.bookname}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity + 1 }),
        }
      );
      if (res.status === 200) {
        setQuantity(quantity + 1);
        dispatch(
          add({
            price: bookData.sprice,
            qty: 1,
          })
        );
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  const subQuantity = async () => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/cart?name=${props.book.bookname}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: quantity - 1 }),
        }
      );
      if (res.status === 200) {
        setQuantity(quantity - 1);
        dispatch(
          subtract({
            price: bookData.sprice,
            qty: 1,
          })
        );
      }
    } catch (error) {
      console.error("Server Error");
    }
  };

  const removeItem = async () => {
    try {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/cart?name=${props.book.bookname}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Server error");
    }
  };

  useEffect(() => {
    displayBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container-fluid books-cart">
        <div className="row my-4">
          <div className="col-md-2 col-12 book-image">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <img
                src={bookData.imgsrc}
                alt="book-cover"
                className="img-fluid"
              />
            </a>
          </div>
          <div className="col-md-8 col-12 book-content">
            <div>
              <h3>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {bookData.name}
                </a>
              </h3>
              <p>by {bookData.author}</p>
            </div>
            <div className="price">
              <h4>Rs {bookData.sprice}.00</h4>
              <h5>Rs {bookData.pprice}.00</h5>
            </div>
            {props.page_details === "order-details" ? (
              <div>Quantity: {quantity}</div>
            ) : (
              <>
                <div className="books-cart-button">
                  <div className="input-group quantity">
                    <button
                      className="input-group-text btn btn-light"
                      disabled={quantity === 1}
                      onClick={subQuantity}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    >
                      {quantity}
                    </span>
                    <button
                      className="input-group-text btn btn-light"
                      disabled={quantity === bookData.qty}
                      onClick={addQuantity}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button className="btn btn-dark" onClick={removeItem}>
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default BooksCart;
