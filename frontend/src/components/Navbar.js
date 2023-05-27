import React, { useContext, useState } from "react";
import logo from "../img/logo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");

    if (login || token) {
      return [
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          {/* use Link tag instead of anchor tag because side does not reloads using Link tag and that is advantage of React */}

          <Link to="/createPost">Create Post </Link>
          <Link style={{ marginLeft: "20px" }} to="/myfollowingpost">
            {" "}
            My Following
          </Link>
          <Link to={""}>
            <button
              className="primaryBtn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>Signup</li>
          </Link>

          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");

    if (login || token) {
      return [
        <>
          {" "}
          <Link to="/">
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <span class="material-symbols-outlined">account_circle</span>
            </li>
          </Link>
          {/* use Link tag instead of anchor tag because side does not reloads using Link tag and that is advantage of React */}
          <Link to="/createPost">
            <li>
              <span class="material-symbols-outlined">add_box</span>
            </li>
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/myfollowingpost">
            <li>
              <span class="material-symbols-outlined">explore</span>
            </li>
          </Link>
          <Link to={""}>
            <li
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <span class="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>Signup</li>
          </Link>

          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <div className="navbar">
      <img
        id = "insta-logo"
        src={logo}
        alt=""
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <ul className="nav-menu">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
}
