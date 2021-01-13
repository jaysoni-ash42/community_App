import React,{useState,useEffect} from 'react'
import "./post.css"
import {auth} from "../firebaseConfig/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton";
import { FavoriteBorder } from "@material-ui/icons";
import Axios from "axios";

function Post({postid,img,username,comment,post,userurl,like}) {
    const [comments,setComment]=useState("");
    const [commentapi,setCommentapi]=useState([]);   
    const [state,setState] = useState(false);
    const [iconcolor,setColor] = useState("");
    const [liked,setLike] = useState(false);

    const addcomment=async (e)=>{
        e.preventDefault();
        try{
        var response =await Axios.post("http://localhost:9000/post/"+postid+"/comments",{
            text:comments,
            username:auth.currentUser.displayName
        });
        if(response.status === 200)
        {
            setComment("");
            setState(true);
        }
    }catch(err)
    {
        alert(err.message);
    }
    }
    useEffect(()=>{
        setCommentapi(JSON.parse(JSON.stringify(comment)));
        if(state === true)
        {
            getComment();
        }
        setState(false);
    },[state])
    async function getComment(){
        try{
            var response = await Axios.get("http://localhost:9000/post/"+postid+"/comments");
            if(response.status === 200)
            {
                setCommentapi(response.data);
            }
        }catch(err)
        {
            alert(err.message);
        }
    }
    const handleClick=(e)=>{
        e.preventDefault();
        Axios.post("http://localhost:9000/post/"+postid+"/like",{
            id:""+auth.currentUser.uid
        }).then((response)=>{
            if(response.status === 200)
            {
                setColor('orange');
            }
        }).catch((err)=>{
            alert(err.message);
        })
    }
    return (
        <div className="Post">
            <div className="post_header">
            <Avatar
              className="post_avatar"
              alt={userurl}
              src={userurl}

          />
            <h3 className="post_text">{username.toUpperCase()}</h3>
            </div>
            <img className="post_image" src={img} alt={img} />
            {
                auth.currentUser ?  <div style={{display:"flex"}}>
                {
                   auth.currentUser ?  liked ? null:like.map(docs=>(
                        docs.id === auth.currentUser.uid ? setLike(true) : null
                    )):null
                }
            <IconButton style={{display:"flex", color:liked ? "orange":`${iconcolor}`}} onClick={!liked ? handleClick : null}><FavoriteBorder/></IconButton>
            <h6>like {Object.keys(like).length}</h6>
            </div> : null
            }
            <h3 className="post_name"><strong>{post.toUpperCase()}</strong></h3>
            <h5 className="post_name">Comments</h5>
                <div className="comments">
                    {
                   commentapi ? commentapi.map(docs=>(
                        <p className="post_comments" key={docs._id}>
                            <b>{docs.username.toUpperCase()}</b>'  {docs.text} 
                        </p>
                    )) :<h4>No Comments</h4>
                   }
                </div> 
            
               
               {
                   auth.currentUser ?  <form className="comment_box"  onSubmit={addcomment}>
                   <input className="comment_input" type="text" placeholder=" Add comment here" value={comments} onChange={(e)=>{setComment(e.target.value)}}/>
                   <Button className="add_comment" disabled={!comments} >Add</Button>
                   </form> :  <h6 style={{color:'Red',textAlign:"center",paddingBottom:5}}>Login to comment!!</h6>
               }
        </div>
    )
}

export default Post;
