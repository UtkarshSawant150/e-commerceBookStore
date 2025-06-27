import React, { useEffect, useState } from "react";
// import { login } from "../store/slice";
import { useSelector } from "react-redux";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [load, setLoad] = useState(false);
  const [sent, setSent] = useState(false);
  // const dispatch = useDispatch();
  const state = useSelector((state) => state.logging);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSent(false);
    setData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const register = await fetch(
      "https://bookish-bliss.onrender.com/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );
    const response = await register.json();
    setLoad(false);
    if (register.status === 201) {
      setData({
        ...data,
        message: "",
      });
      setSent(true);
    } else if (register.status === 500) {
      alert(response.message);
    }
  };

  useEffect(() => {
    const callContactPage = async () => {
      const res = await fetch(
        `https://bookish-bliss.onrender.com/?token=${localStorage.getItem(
          "token"
        )}`
      );

      const data1 = await res.json();
      if (res.status === 200) {
        if (state.isLoggedIn) {
          setData({
            name: data1.firstname + " " + data1.lastname,
            email: data1.email,
            message: "",
          });
        }
      }
    };
    if (localStorage.getItem("token")) {
      callContactPage();
    }
  }, []);

  return (
    <div className="container-fluid bg-body-secondary contact">
      <div className="row ">
        <div className="col-lg-8 col-12 my-3 mx-auto bg-white contact-box">
          <div className="contact1">
            <h1>Drop a message</h1>
            <form onSubmit={handlesubmit} method="POST">
              {sent ? (
                <div className="alert alert-info p-2" role="alert">
                  Message Sent
                </div>
              ) : null}
              <div className="my-2">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="message">Message</label>
                <br />
                <textarea
                  type="text"
                  id="message"
                  name="message"
                  colSpan="10"
                  rowSpan="7"
                  value={data.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                {load ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span className="px-1" role="status">
                      Loading...
                    </span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
          <div className="contact2">
            <div className="my-3">
              <h3>Phone</h3>
              <p>(+91)983433400</p>
            </div>
            <div className="my-3">
              <h3>Email</h3>
              <p>pawaratharv194@gmail.com</p>
            </div>
            <div className="my-3">
              <h3>Address</h3>
              <p>Nanded, Maharashtra, INDIA</p>
            </div>
            <div className="icons my-3">
              <h3>Follow Us</h3>
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
