import React, { useEffect, useState } from "react";
import imgsrc from "../images/profile.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../store/slice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  // const dispatch = useDispatch();
  // const state = useSelector((state) => state.logging);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const setDob = (date) => {
    const d = new Date(date);
    let months;
    if (d.getMonth() <= 8) {
      months = "0" + (d.getMonth() + 1);
    }
    return `${d.getDate()}-${months}-${d.getFullYear()}`;
  };

  useEffect(() => {
    const callProfilePage = async () => {
      try {
        const res = await fetch(
          `https://bookish-bliss.onrender.com/?token=${localStorage.getItem(
            "token"
          )}`
        );

        const data = await res.json();
        if (res.status === 200) {
          data.dob = setDob(data.dob);
          setUserData(data);
        }
      } catch (err) {
        console.error("Server Error");
      }
    };

    if (localStorage.getItem("email")) callProfilePage();
    else navigate("/");
  }, []);
  return (
    <>
      <div className="container-fluid bg-body-secondary profile-page">
        <div className="row">
          <div className=" my-3 col-12 p-4 bg-white mx-auto profile">
            <h1>User Profile</h1>
            <div className="profile-data">
              <div>
                <p>
                  <span>First Name:</span>
                  <span>{userData.firstname}</span>
                </p>
                <p>
                  <span>Last Name:</span>
                  <span>{userData.lastname}</span>
                </p>
                <p>
                  <span>Email:</span>
                  <span style={{ textTransform: "none" }}>
                    {userData.email}
                  </span>
                </p>
                <p>
                  <span>Phone:</span>
                  <span>{userData.phone}</span>
                </p>
                <p>
                  <span>Gender:</span>
                  <span>{userData.gender}</span>
                </p>
                <p>
                  <span>Date of Birth:</span>
                  <span>{userData.dob}</span>
                </p>
              </div>
              <div className="profile-image d-none d-md-block">
                <img src={imgsrc} alt="profile" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
