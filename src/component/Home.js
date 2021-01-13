import React,{useState,useEffect}  from 'react';
import Axios from "axios";
import Post from "./post";
import "./home.css"
import CircularProgress from "@material-ui/core/CircularProgress";


function Home() {
  const [post,setPost]=useState([]);
   useEffect(() => {
      setTimeout(() => {
         Axios.get("http://localhost:9000/post").then((res)=>{
           setPost(res.data);
           console.log(res.data);
         }).catch((err)=>{
           alert(err.message);
         })
     },2000);
    },[post]);
  return(
  <center><div className="home">
    {
      post.length > 0 ?
      (post.map(post=>(
       <center><Post  postid={post._id} img={post.img} username={post.username} post={post.post} comment={post.comments} userurl={post.userimg} like={post.like} key={post._id}/></center>
      ))) : <div style={{display:"flex",flexDirection:"column"}}><CircularProgress style={{height:80,width:80}} color="secondary"/>
      <h1 style={{fontFamily:"monospace",marginTop:20}}>Loading......</h1>
      </div>
    }
  </div></center>);
}

export default Home
