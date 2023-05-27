import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const [pics, setPics] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeProfile = () => {
    if (changePic) {
      setChangePic(false);
    } else {
      setChangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:5000/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setPics(result.post);
        setUser(result.user);
      });
  }, []);
  return (
    <div className="profile">
      {/* Profile  frame*/}
      <div className="profile-frame">
        {/* profile-pic */}
        <div className="profile-pic">
          <img onClick={changeProfile} src={user.Photo? user.Photo : picLink} alt="" />
        </div>

        {/* profile-data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{pics ? pics.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />

      {/* Gallery */}
      <div className="gallery">
        {pics.map((image) => {
          return (
            <img
              key={image._id}
              onClick={() => {
                toggleDetails(image);
              }}
              src={image.photo}
              className="item"
            ></img>
          );
        })}
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
