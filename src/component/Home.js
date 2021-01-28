import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Post from "./post";
import "./home.css"
import CircularProgress from "@material-ui/core/CircularProgress";

function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:9000/post").then((res) => {
      setPost(res.data);
      console.log(res.data);
    }).catch((err) => {
      alert(err.message);
    })
  }, []);
  return (
    <center><div className="home">
      {
        post.length > 0 ?
          (post.map(post => (
            <div key={post._id}>
              <center><Post postid={post._id} img={post.img} username={post.username} post={post.post} comment={post.comments} userurl={post.userimg} like={post.like} key={post._id} /></center>
            </div>
          ))) : <div style={{ display: "flex", flexDirection: "column", width: 100, height: 100 }}><CircularProgress style={{ height: 80, width: 80, marginTop: 300 }} color="secondary" />
            <h1 style={{ fontFamily: "monospace", marginTop: 20 }}>Loading......</h1>
          </div>
      }
    </div></center>);
}

export default Home
