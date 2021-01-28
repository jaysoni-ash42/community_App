import React, { useEffect, useState, useContext } from 'react'
import "./nav.css"
import firebase from "firebase/app"
import { auth } from "../firebaseConfig/firebase";
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import { ExitToAppSharp, AccountBox, HomeOutlined } from "@material-ui/icons"
import { NavLink, Redirect } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Input } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Axios from "axios";
import { userContext, Searchpost, Searchuser } from "./userContext";

function Nav() {
  const { user, setUser } = useContext(userContext);
  const { searchuser, setSearchuser } = useContext(Searchuser)
  const { searchpost, setSearchpost } = useContext(Searchpost);
  const [anchorEl, setAnchorEl] = useState();
  const [search, setSearch] = useState("");
  const [bool, setBool] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (Object.keys(search).length <= 0) {
      alert("Type username");
      setSearch("");
    }
    else {
      Axios.get("http://localhost:9000/search/" + search.toLowerCase()).then((response) => {
        if (response.status === 200 || 304) {
          setSearchuser(JSON.parse(JSON.stringify(response.data.user)));
          setSearchpost(JSON.parse(JSON.stringify(response.data.post)));
          console.log(searchuser);
          console.log(searchpost);
          setBool(true);
          setSearch("");
        }
        else {
          alert("no such user");
          setSearch("");
        }

      }).catch((err) => {
        alert("no such user");
        setSearch("");
      })

    }
  }
  function handleUpload(user) {
    Axios.post("http://localhost:9000/user", {
      userid: "" + user.uid,
      userimg: user.photoURL,
      username: user.email
    }).then((response) => {
      console.log(response.data);
    }).catch((err) => {
      alert(err.message);
    });
  }



  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  useEffect(() => {
    setBool(false);
  }, [bool])
  const Login_inUSer = (e) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var user = result.user;
        handleUpload(user);
        setUser(user);
      }).catch((error) => {
        alert(error.message);
      });
  }
  const Log_out = (e) => {
    e.preventDefault();
    auth.signOut();
    setUser(null);
    setAnchorEl(null);
  }
  return (
    <nav className="nav">
      <div className="header">
        <img style={{ width: 50, height: 50, borderRadius: 50 }} src="https://firebasestorage.googleapis.com/v0/b/reactapp-8566f.appspot.com/o/images%2Fstock-vector-community-logo-icon-template-vector-app-1453629920.jpg?alt=media&token=2af0e608-4fb3-4fce-83cb-2edac9b1311c" alt="https://firebasestorage.googleapis.com/v0/b/reactapp-8566f.appspot.com/o/images%2Fstock-vector-community-logo-icon-template-vector-app-1453629920.jpg?alt=media&token=2af0e608-4fb3-4fce-83cb-2edac9b1311c" />
        <h3 style={{ marginLeft: 5 }}>Community App</h3>
      </div>
      <div>
        <form className="searchbar" onSubmit={handleSearch} >
          <Input type="text" placeholder="Search" disableUnderline={true} style={{ textAlign: "center", paddingTop: 5, paddingLeft: 5, width: '40vh' }} onChange={(e) => setSearch(e.target.value)} value={search} />
          <IconButton style={{ padding: 0 }}><Search /></IconButton>
          {
            bool ? <Redirect style={{ textDecoration: 'none', color: 'black' }} to={`/search/${search}`} /> : null
          }
        </form>
      </div>
      {
        user ? <div className="login_signup_button">
          <h4 className="name"><strong>{user.email.toUpperCase()}</strong></h4>
          <Avatar alt={user.photoURL} src={user.photoURL} style={{ cursor: "pointer" }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
          <Menu
            style={{ padding: 10 }}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to="/" >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}><HomeOutlined style={{ padding: 0, marginRight: 5, color: "gray" }} />Home</MenuItem>
            </NavLink>
            <NavLink style={{ textDecoration: 'none', color: 'black' }} to={"/user/" + user.email} >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}><AccountBox style={{ padding: 0, marginRight: 5, color: "gray" }} />Profile</MenuItem>
            </NavLink>
            <MenuItem onClick={Log_out} style={{ margin: 10 }}><ExitToAppSharp style={{ padding: 0, marginRight: 5, color: "gray" }} />Log out</MenuItem>
          </Menu>
        </div>
          : <div className="login_signup_button">
            <Button type="Submit" onClick={Login_inUSer}>Login In</Button>
          </div>

      }
    </nav>
  )
}

export default Nav
