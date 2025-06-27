import React, { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import BooksCart from "../components/BooksCart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../store/slice/amount";

const Cart = (props) => {
  const [bookNames, setBookNames] = useState([]);
  const [amount, setAmount] = useState(0);
  const state = useSelector((state) => state.amount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (props.pageName === "order-details") {
      dispatch(reset());
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/cart/all?email=${localStorage.getItem(
            "email"
          )}`,
          {
            method: "DELETE",
          }
        );
        if (res.status === 200) {
          console.log("Order Placed");
          navigate("/orderplaced");
        }
      } catch (error) {
        console.error("Server error");
      }
    } else {
      navigate("/cart/orderdetails");
    }
  };

  useEffect(() => {
    const callCartPage = async () => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/cartitems?email=${localStorage.getItem(
            "email"
          )}`
        );
        const data = await res.json();
        if (res.status === 200) {
          setBookNames(data);
        }
      } catch (error) {
        console.error("Server Error");
      }
    };
    if (localStorage.getItem("email")) callCartPage();
    else navigate("/");
  }, []);
  return (
    <>
      <div className="container-fluid bg-body-secondary py-3 cart">
        <div className="row my-2 mx-2 mx-lg-0">
          <div className="col-lg-8 col-12 bg-white mx-auto cart-title">
            <h1>
              {props.pageName === "order-details" ? "Order Summary" : "Cart"}
            </h1>
          </div>
        </div>
        <div className="row my-2 mx-2 mx-lg-0">
          <div className="col-lg-8 col-12 bg-white mx-auto">
            {bookNames.length ? (
              bookNames.map((item, index) => {
                return (
                  <BooksCart
                    book={item}
                    page_details={props.pageName}
                    key={index}
                  />
                );
              })
            ) : (
              <NotFound message="Cart is empty" img="2" />
            )}
          </div>
        </div>

        <div className="row mx-2 mx-lg-0 sticky-bottom">
          <div className="col-lg-8 col-12 bg-white mx-auto total-amount py-3">
            <div>
              <h3>Total Amount: Rs {state.totalAmount}.00</h3>
            </div>
            <div>
              <button
                className="btn btn-dark"
                disabled={bookNames.length == 0}
                onClick={handleClick}
              >
                {props.pageName === "order-details"
                  ? "Confirm Order"
                  : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
