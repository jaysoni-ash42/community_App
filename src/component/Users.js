import React,{useState,useEffect} from 'react';
import {auth,storage} from "../firebaseConfig/firebase";
import "./users.css";
import Axios from "axios";
import Uposts from "./Uposts";
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {PostAdd} from "@material-ui/icons"
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow:1,
      justifyContent: 'space-around',
    },
    gridList: {
      
      padding:theme.spacing(1)
    },
  }));


function Users({user}) {
    const classes = useStyles();
    const [post,setPost]=useState([]);
    const [openUpload,setUpload]=useState(false);
    const [caption,setCaption]=useState("");
    const [image,setImage]=useState("");
    const [progress,setProgress]=useState(0);
    const [value,setValue]=useState(false);
    const handleChange=(e)=>{
    if(e.target.files[0])
    {
        setImage(e.target.files[0]);

    }
};
const handleUpload=(e)=>{
  e.preventDefault();
  console.log(Object.keys(caption).length+" "+Object.keys(image).length);
  if(Object.keys(caption).length <= 0 || Object.keys(image).length < 0)
  {
      alert("need to select the data before upload")
      return;
  }
  const uploadtask=storage.ref(`images/${image.name}`).put(image);
  uploadtask.on(
      "state_changed",
      (snapshot)=>{
          var progress=Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
          setProgress(progress);
      },
      (error)=>{
          console.log(error.message);
          alert(error.message);
          setUpload(false);
      },
      ()=>{
          storage.ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url)=>{
                   Axios.post("http://localhost:9000/post",{
                  userid:""+auth.currentUser.uid,
                  userimg:auth.currentUser.photoURL,
                  img:url,
                  post:caption,
                  username:auth.currentUser.displayName
                 }).then((response)=>{
                   console.log(response);
                  setProgress(0);
                  setCaption("");
                  setImage("");
                  setValue(!value);
                  setUpload(false);
                 }).catch((err)=>{
                  alert(err.message);
                  setUpload(false);
                  setProgress(0);
                  setCaption("");
                  setImage("");
                 });
          }).catch((err)=>{
            alert(err.message);
            setUpload(false);
          })
      }
  )

}

  const openupload=(e)=>{
    e.preventDefault();
    setUpload(true);
  }
  const closeUpload=(e)=>{
    e.preventDefault();
    setUpload(false);
  }
      useEffect(()=>{
        if(user === null)
        {
          setTimeout(()=>{
            Axios.get("http://localhost:9000/post/"+auth.currentUser.uid).then((post)=>{
              setPost(post.data);
          }).catch((err)=>{
              alert(err.message);
          })
          },6000)
        } 
        else{
          Axios.get("http://localhost:9000/post/"+user.uid).then((post)=>{
            setPost(post.data);
        }).catch((err)=>{
            alert(err.message+"somethingwentwrong");
        })
        }
    },[value,user])
    
    return (
        <div className="user">
              <Modal
             open={openUpload}
            onClose={closeUpload}
                >
            <div className="Modal" >
            <div className="Imageupload">
            <h1 className="post"><strong>Upload a Post</strong></h1>
            <progress className="Imageupload_progress" value={progress} max="100" />
            <input type="text" className="Imageupload_progress"  placeholder="Enter a caption...." onChange={(e)=>setCaption(e.target.value)}/>
            <input type="file" className="Imageupload_progress" onChange={handleChange}/>
            <div className="border">
            <center><Button  onClick={handleUpload} >Upload</Button></center>
            </div>
            <p className="post"># POst a creative post to let the world Know about your work</p>
        </div>  
        </div>
      </Modal>
      {
        user ?
        <div className="user_header">
            <img className="profile_image"  alt={user.photoURL} src={user.photoURL}/> 
            <h1 className="profile_name">{user.displayName.toUpperCase()}</h1>
           <IconButton onClick={openupload}>Upload post<PostAdd/></IconButton>
           </div> : null
      }
           <h1 className="post"> Posts </h1>
           <div className="posts_view">
           <Grid container  direction="row"  className={classes.root} >
               {
                   post.length > 0 ? post.map(post=>(
                       
               <Grid item xs={"auto"}  className={classes.gridList}> <Uposts  postid={post._id} img={post.img} username={post.username} post={post.post} comment={post.comments} userurl={post.userimg} like={post.like} key={post._id}/></Grid>
                   )): <h1 style={{fontFamily:"monospace",marginTop:20}}>Add newPost</h1>
               }
               </Grid> 
               </div>
        </div>
    );
}

export default Users;
