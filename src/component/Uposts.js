import React,{useState} from 'react';
import "./uposts.css";
import Modal from "@material-ui/core/Modal"
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { FavoriteBorder,CommentOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";


function Uposts({comment,like,img,post}) {
    const [openupload,setUpload]=useState(false);
   const openUpload=(e)=>{
    e.preventDefault();
    setUpload(true);
  }
  const closeUpload=(e)=>{
    e.preventDefault();
    setUpload(false);
  }
  function CheckString(url) {
    const str = url.split("?");
    const final = str[0].split(".");
    var arr = ["jpeg", "jpg", "gif", "png"];
    if (arr.includes(final[5])) {
        return true;
    }
    else {
        return false;
    }
}
    return (
      <div>
                    <Modal
                    open={openupload}
                   onClose={closeUpload}>
                   <div className="Modal_u" >
                   {
                    CheckString(img) ? <img className="post_image_u" src={img} alt={img} /> :
                    <ReactPlayer url={img} controls={true} loop={true} className="post_image_u" playing={true} />
                    }
                   <div className="border">
                     <div style={{display:'flex'}}>
                   <IconButton style={{padding:0,justifyContent:"flex-start"}}><FavoriteBorder style={{color:"orange"}}/></IconButton>
                   <h6 style={{fontFamily:"monospace",marginLeft:5}}>{Object.keys(like).length}</h6>
                   <CommentOutlined style={{color:"orange",marginLeft:10,marginTop:2.5}}/> <h6 style={{fontFamily:"monospace",marginLeft:5}}>{Object.keys(comment).length}</h6>
                   </div>
                   <div className="comments_u">
                           {
                          comment.length > 0 ? comment.map(docs=>(
                               <div className="post_comments_u" key={docs._id}>
                                    <Avatar style={{height:25,width:25,marginRight:10}} alt={docs.userimg} src={docs.userimg}/>
                                   <b>{docs.username.toUpperCase()}</b>'  {docs.text} 
                               </div>
                           )) :<h4 style={{fontSize:15,fontFamily:"monospace",padding:5}}>No Comments</h4>
                          }
                       </div>
                       </div>
                    </div>
                    </Modal> 
                    <div className="Post_u"> 
                    <div className="Post_image">
                    {
                    CheckString(img) ? <img className="post_image_u" src={img} alt={img} /> :
                    <ReactPlayer url={img} controls={true} loop={true}  playing={true} width="100%" />
                    }
                   <div className="post_image_details post_image_details-blurr" onClick={openUpload}>
                   <h4 className="post_name_u"><strong>{"`"+post.toUpperCase()+"`"}</strong></h4>
                   <IconButton onClick={openUpload}><FavoriteBorder style={{color:"white"}}/> <h6 style={{fontFamily:"monospace",marginLeft:5,color:"white",fontSize:20}}>{Object.keys(like).length}</h6></IconButton>
                   <IconButton onClick={openUpload}><CommentOutlined style={{color:"white"}}/> <h6 style={{fontFamily:"monospace",marginLeft:5,color:"white",fontSize:20}}>{Object.keys(comment).length}</h6></IconButton>
                   </div>
                   </div>
                   </div>
                   </div>
    )
}

export default Uposts
