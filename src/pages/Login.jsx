import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgsrc from "../images/login.svg";
import imgsrc2 from "../images/bookish-bliss-logo.png";
import { useDispatch } from "react-redux";
import { login } from "../store/slice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState(true);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValid(true);
    setData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      setLoad(true);
      const register = await fetch("https://bookish-bliss.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      const response = await register.json();
      setLoad(false);
      if (register.status === 200) {
        setData({
          email: "",
          password: "",
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.email);
        dispatch(login());
        setValid(true);
        navigate("/");
      } else if (register.status === 500 || register.status === 400) {
        setValid(false);
      }
    } catch (err) {
      console.error("Server Error");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("email")) navigate("/");
  }, []);
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-image">
            <img src={imgsrc} alt="login" className="img-fluid" />
          </div>

          <div className="login-details">
            <form method="post" onSubmit={handlesubmit}>
              <div>
                <img src={imgsrc2} alt="" />
              </div>
              {!valid ? (
                <div className="alert alert-danger p-2" role="alert">
                  Invalid Credentials
                </div>
              ) : null}
              <div>
                <label htmlFor="username">Email</label>
                <br />
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  minLength="6"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
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
                  "Login"
                )}
              </button>
              <p>
                <a href="/register">Create An Account</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
