import React, { useState, useEffect } from "react";
import pic from "../img/pic.jpg";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Createpost() {
  const navigate = useNavigate();
  
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  
  // Toast functions
  const notifyA = (message) => toast.error(message);
  const notifyB = (message) => toast.success(message);

  useEffect(() => {
    //saving post to mongodb
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {if(data.error){
          notifyA(data.error)
        }
      else
    {
      navigate("/");
      notifyB("Posted Successfully");
    }})
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    console.log(body, image);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "cloud-18");
    fetch("https://api.cloudinary.com/v1_1/cloud-18/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button
          id="post-btn"
          onClick={() => {
            postDetails();
          }}
        >
          Share
        </button>
      </div>

      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>

      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={pic} alt="" />
          </div>
          <h5></h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="Write a Caption"
        ></textarea>
      </div>
    </div>
  );
}

export default Createpost;
