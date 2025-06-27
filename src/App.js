import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import BookDetails from "./pages/BookDetails";
import OrderDetails from "./pages/OrderDetails";
import OrderPlaced from "./components/OrderPlaced";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<Books pathName="home" />} />
          <Route path="/books/search" element={<Books pathName="search" />} />
          <Route
            path="/books/:category"
            element={<Books pathName="category" />}
          />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart/orderdetails" element={<OrderDetails />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
