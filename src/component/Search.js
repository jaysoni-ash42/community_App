import React, { useContext } from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Post from "./post";
import { SearchPost, SearchUser } from "../Context";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    gridList: {
        padding: theme.spacing(1)
    },
}));

function Search() {
    const { searchuser, setValue } = useContext(SearchUser);
    const { searchpost, setPost } = useContext(SearchPost);
    React.useEffect(() => {
        setValue(JSON.parse(window.localStorage.getItem("value")));
        setPost(JSON.parse(window.localStorage.getItem("post")));
    }, [])
    const classes = useStyles();
    return (
        <div className="search">
            {
                Object.keys(searchuser).length > 0 ? <div className="user_header">
                    <img className="profile_image" alt={searchuser[0].userimg} src={searchuser[0].userimg} />
                    <h1 style={{ fontFamily: "monospace" }} >{searchuser[0].username.toUpperCase()}</h1>
                </div> : <h6>Search the USer</h6>
            }
            <h1 className="post"> Posts </h1>
            <div className="posts_view">
                <Grid container spacing={1} className={classes.root}>
                    {
                        searchpost != null ? searchpost.map(post => (
                            <Grid item xs={"auto"} className={classes.gridList} key={post._id} >
                                <Post postid={post._id} img={post.img} username={post.username} post={post.post} comment={post.comments} userurl={post.userimg} like={post.like} key={post._id} />
                            </Grid>
                        )) : <h1 style={{ paddingBottom: 10 }}>No Post to show</h1>
                    }
                </Grid>
            </div>
        </div>

    )
}

export default Search
