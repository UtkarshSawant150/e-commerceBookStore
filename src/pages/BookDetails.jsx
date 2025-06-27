import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { add } from "../store/slice/amount";
import { useDispatch } from "react-redux";

const BookDetails = () => {
  const { id } = useParams();
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();

  const addToCart = async () => {
    try {
      const res = await fetch(`https://bookish-bliss.onrender.com/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: data._id,
          email: localStorage.getItem("email"),
        }),
      });
      if (res.status === 201) {
        setAddedToCart(true);
        dispatch(
          add({
            price: data.sprice,
            qty: 1,
          })
        );
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Server Error");
    }
  };

  const handleClick1 = () => {
    addToCart();
  };

  const handleClick2 = () => {
    addToCart();
    navigate("/cart");
  };

  useEffect(() => {
    const callCart = async (data) => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/cart?name=${
            data.name
          }&email=${localStorage.getItem("email")}`
        );
        const data1 = await res.json();
        if (res.status === 200) {
          setAddedToCart(data1.found);
        }
      } catch (error) {
        console.error("Server Error");
      }
    };
    const displayData = async () => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/book/${id}`
        );
        const data1 = await res.json();
        if (res.status === 200) {
          setData(data1[0]);
          setSrc("/" + data1[0].imgsrc);
          callCart(data1[0]);
        }
      } catch (error) {
        console.error("Server Error");
      }
    };
    displayData();
  }, []);
  return (
    <>
      <div className="container-fluid book-details-page my-3 px-3">
        <div className="row">
          <div className="col-lg-4 col-12 book-image">
            <div>
              <img src={src} className="img-fluid" alt="book-pic" />
            </div>
          </div>
          <div className="col-12 col-lg-8 book-detail">
            <div className="book-name mt-4 mt-lg-0">
              <h1>{data.name}</h1>
              <p>by {data.author}</p>
            </div>
            <div className="price">
              <h2>Price</h2>
              <p>
                Rs {data.pprice}.00 <span>Rs {data.sprice}.00</span>
              </p>
              <div className="book-buy-button my-2">
                <button
                  className="btn btn-dark"
                  onClick={handleClick1}
                  disabled={addedToCart}
                >
                  {addedToCart ? "Added to cart" : "Add to cart"}
                </button>
                <button className="btn btn-dark" onClick={handleClick2}>
                  Buy Now
                </button>
              </div>
            </div>
            <div>
              <h2>About the Book</h2>
              <p>{data.description}</p>
            </div>
            <div>
              <h2>About The Author</h2>
              <p>{data.authordetails}</p>
            </div>
            <div>
              <h2>Publisher</h2>
              <p>{data.publisher}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
