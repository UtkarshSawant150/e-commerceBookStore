import React from "react";
import imgsrc from "../images/bookish-bliss-logo2.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="row pt-5 px-lg-5 px-1 footer1">
            <div className="col-12 col-lg-5 mx-auto">
              <h3>About us</h3>
              <p>
                At Bookish Bliss, we celebrate the art of reading. Our cozy
                reading corners invite you to lose yourself in the pages of a
                beloved classic or to explore the latest bestseller. Escape the
                hustle and bustle of the outside world as you indulge in the
                comfort of our warm ambiance, surrounded by the scent of freshly
                printed pages.
              </p>
              <img src={imgsrc} alt="logo" />
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mx-auto mt-3 mt-lg-0">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="/profile">My Account</a>
                </li>
                <li>
                  <a href="/books">Books</a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
                <li>
                  <a href="#">Wishlist</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 col-lg-2 mx-auto mt-3 mt-lg-0">
              <h3>Support</h3>
              <ul>
                <li>
                  <a href="#">Tech Support</a>
                </li>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-4 col-lg-2 mx-auto mt-3 mt-lg-0">
              <div className="icons">
                <h3>Follow Us</h3>
                <a href="">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
              <div className="icons mt-3 mt-sm-5">
                <h3>Payment</h3>
                <a href="">
                  <i className="fa-brands fa-cc-visa"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-cc-mastercard"></i>
                </a>
                <a href="">
                  <i className="fa-regular fa-credit-card"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-google-pay"></i>
                </a>
                <a href="">
                  <i className="fa-brands fa-cc-paypal"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="row footer2">
            <div className="col-12 col-lg-6 text-center text-lg-end">
              <a href="#">Privacy policy</a> |{" "}
              <a href="#">Terms & Conditions</a> | <a href="#">Cookies</a>
            </div>
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <p>
                {" "}
                &copy; 2023 Bookish Bliss By Sneh Daluka. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
