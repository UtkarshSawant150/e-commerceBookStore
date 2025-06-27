import React, { useEffect, useState } from "react";
import imgsrc from "../images/bookish-bliss-logo.png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [valid, setValid] = useState(true);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValid(true);
    setData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    if (data.password !== data.cpassword) {
      setValid(false);
    } else {
      setLoad(true);
      const register = await fetch(
        "https://bookish-bliss.onrender.com/register",
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
      if (response.status === 201) {
        alert(response.message);
        setData({
          firstname: "",
          lastname: "",
          gender: "",
          dob: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
        navigate("/login");
      } else if (response.status === 500 || response.status === 409) {
        alert(response.message);
        navigate("/register");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("email")) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="register-page">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="row g-3 needs-validation px-3 px-md-5 py-3"
        >
          <div className="col-md-12 register-logo">
            <img src={imgsrc} className="img-fluid" alt="logo" />
          </div>
          {!valid ? (
            <div className="alert alert-danger p-2" role="alert">
              Password does not match
            </div>
          ) : null}
          <div className="col-md-6">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              name="lastname"
              onChange={handleChange}
              value={data.lastname}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomEmail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustomEmail"
              aria-describedby="inputGroupPrepend"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Invalid Email.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomPhone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustomPhone"
              aria-describedby="inputGroupPrepend"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Invalid Phone Number.</div>
          </div>
          <div className="col-md-6 gender">
            <div>
              <p>Gender</p>
            </div>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="male"
                  name="gender"
                  onClick={handleChange}
                  id="flexRadioDefault1"
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="female"
                  name="gender"
                  onClick={handleChange}
                  id="flexRadioDefault2"
                  required
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomDate" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="validationCustomDate"
              name="dob"
              onChange={handleChange}
              value={data.dob}
              required
            />
            <div className="invalid-feedback">Enter valid Date of Birth.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Password
            </label>
            <input
              type="password"
              minLength="6"
              className="form-control"
              id="validationCustom03"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Invalid password.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom04" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              minLength="6"
              className="form-control"
              id="validationCustom04"
              name="cpassword"
              value={data.cpassword}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Password should match.</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-dark"
              onSubmit={handleSubmit}
            >
              {load ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span className="px-1" role="status">
                    Registering...
                  </span>
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
