import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add } from "../store/slice/amount";
// import imgsrc from "../images/silent-patient.jpg";
const Card = (props) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const src = "/" + props.bookData.imgsrc;
  const href = `/book/${props.bookData._id}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.logging);

  const handleClick = async (e) => {
    try {
      const res = await fetch(`https://bookish-bliss.onrender.com/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: props.bookData._id,
          email: localStorage.getItem("email"),
        }),
      });
      if (res.status === 201) {
        setAddedToCart(true);
        dispatch(
          add({
            price: props.bookData.sprice,
            qty: 1,
          })
        );
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Server error");
    }
  };
  useEffect(() => {
    const callCard = async () => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/cart?name=${
            props.bookData.name
          }&email=${localStorage.getItem("email")}`
        );
        const data = await res.json();
        if (res.status === 200) {
          setAddedToCart(data.found);
        }
      } catch (error) {
        console.error("Server Error.Reload the page.");
      }
    };
    callCard();
  }, []);
  return (
    <>
      <div className="container-fluid cards">
        <div className="row my-4">
          <div className="col-md-2 col-12 card-image">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <img src={src} alt="book-image" className="img-fluid" />
            </a>
          </div>
          <div className="col-md-8 col-12 card-content">
            <div>
              <h3>
                <a href={href} target="_blank" rel="noreferrer">
                  {props.bookData.name}
                </a>
              </h3>
              <p>by {props.bookData.author}</p>
            </div>
            <div className="price">
              <h4>Rs {props.bookData.sprice}.00</h4>
              <h5>Rs {props.bookData.pprice}.00</h5>
            </div>
            <button
              className="btn btn-dark"
              onClick={handleClick}
              disabled={addedToCart}
            >
              {!addedToCart ? "Add to Cart" : "Added to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
