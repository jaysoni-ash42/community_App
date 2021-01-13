import React,{useState} from 'react';
import "./uposts.css";
import Modal from "@material-ui/core/Modal"
import IconButton from "@material-ui/core/IconButton";
import { FavoriteBorder } from "@material-ui/icons";

function Uposts({img,comment,post,like}) {
    const [openupload,setUpload]=useState(false);
   const openUpload=(e)=>{
    e.preventDefault();
    setUpload(true);
  }
  const closeUpload=(e)=>{
    e.preventDefault();
    setUpload(false);
  }
    return (
        <div>
              <Modal
             open={openupload}
            onClose={closeUpload}
                >
            <div className="Modal_u" >
            <img className="post_image_u" src={img} alt=""/>
            <h4 style={{fontFamily:"monospace"}}>Comments </h4>
            <div className="comments_u">
                    {
                   comment ? comment.map(docs=>(
                        <p className="post_comments_u" key={docs._id}>
                            <b>{docs.username.toUpperCase()}</b>'  {docs.text} 
                        </p>
                    )) :<h4>No Comments</h4>
                   }
                </div>
                <IconButton style={{color:"orange",maxHeight:4}}><FavoriteBorder/> <h6 style={{fontFamily:"monospace",marginLeft:5}}>{Object.keys(like).length}</h6></IconButton>
             </div>
             </Modal>
            <div className="Post_u">
            <img className="post_image_u" src={img} alt="" onClick={openUpload}/>
            <h3 className="post_name_u"><strong>{post.toUpperCase()}</strong></h3>
        </div>
        </div>
    )
}

export default Uposts
