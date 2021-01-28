import React, { useState, useEffect, useContext } from 'react'
import "./post.css"
import { auth } from "../firebaseConfig/firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton";
import { FavoriteBorder, CommentOutlined } from "@material-ui/icons";
import Axios from "axios";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { userContext } from "./userContext";
import ReactPlayer from 'react-player';

function Post({ postid, img, username, comment, post, userurl, like }) {
    const { user, setUser } = useContext(userContext);
    const [comments, setComment] = useState("");
    const [commentapi, setCommentapi] = useState([]);
    const [state, setState] = useState(false);
    const [iconcolor, setColor] = useState("");
    const [liked, setLike] = useState(false);
    const [Likes, setLikes] = useState(Object.keys(like).length);

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

    function handlecomment(e, commentId) {
        e.preventDefault();
        Axios.delete("http://localhost:9000/post/" + postid + "/comments/" + commentId).then((response) => {
            if (response.status === 200) {
                setState(true);
            }

        }).catch((err) => {
            alert(err.message);
        })
    }

    const addcomment = async (e) => {
        e.preventDefault();
        try {
            var response = await Axios.post("http://localhost:9000/post/" + postid + "/comments", {
                userimg: auth.currentUser.photoURL,
                userid: auth.currentUser.uid,
                text: comments,
                username: auth.currentUser.email
            });
            if (response.status === 200) {
                setComment("");
                setState(true);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        setCommentapi(JSON.parse(JSON.stringify(comment)));
        if (state === true) {
            getComment();
            setState(false);
        }
    }, [state])
    async function getComment() {
        try {
            var response = await Axios.get("http://localhost:9000/post/" + postid + "/comments");
            if (response.status === 200) {
                setCommentapi(response.data);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:9000/post/" + postid + "/like", {
            id: "" + auth.currentUser.uid
        }).then((response) => {
            if (response.status === 200) {
                setLikes(Likes + 1);
                setColor('orange');
                setLike(true);
            }
        }).catch((err) => {
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
            {
                CheckString(img) ? <img className="post_image" src={img} alt={img} /> :
                    <ReactPlayer url={img} controls={true} loop={true} playing={true} width="100%" height="60vh" />
            }
            {
                user ? <div style={{ display: "flex" }}>
                    {
                        auth.currentUser ? liked ? null : like.map(docs => (
                            docs.id === auth.currentUser.uid ? setLike(true) : null
                        )) : null
                    }
                    <IconButton onClick={auth.currentUser ? !liked ? handleClick : null : null}><FavoriteBorder style={{ color: liked ? "orange" : `${iconcolor}` }} /></IconButton>
                    <h6 style={{ fontFamily: "monospace" }}>{Likes}</h6>
                    <CommentOutlined style={{ color: "orange", marginTop: 5, marginLeft: 10 }} />
                    <h6 style={{ fontFamily: "monospace", marginLeft: 10 }}>{Object.keys(commentapi).length}</h6>
                </div> : null
            }
            <h3 className="post_name"><strong>{post.toUpperCase()}</strong></h3>
            <div className="comments">
                {
                    commentapi ? commentapi.map(docs => (
                        <div className="post_comments" key={docs._id}>
                            <div style={{ display: 'flex', width: 'auto' }}>
                                <Avatar style={{ height: 25, width: 25, marginRight: 10 }} alt={docs.userimg} src={docs.userimg} />
                                <h5>{docs.username.toUpperCase()}</h5>
                                {auth.currentUser ? docs.userid === auth.currentUser.uid ? <IconButton style={{ color: "red", padding: 0, marginLeft: 10 }} onClick={(e) => { handlecomment(e, docs._id) }}><DeleteForever style={{ height: 18, width: 18 }} /></IconButton> : null : null}
                            </div>
                            <h5 className="comments_text">{docs.text}</h5>
                        </div>
                    )) : <h4>No Comments</h4>
                }
            </div>
            {
                user != null ? <form className="comment_box" onSubmit={addcomment}>
                    <input className="comment_input" type="text" placeholder=" Add comment here" value={comments} onChange={(e) => { setComment(e.target.value) }} />
                    <Button className="add_comment" disabled={!comments} >Add</Button>
                </form> : <h6 style={{ color: 'Orangered', textAlign: "center", paddingBottom: 5, fontFamily: "monospace" }}>Login to comment!!</h6>
            }
        </div>
    )
}

export default Post;
