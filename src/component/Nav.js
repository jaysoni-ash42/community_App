import React,{useEffect,useState} from 'react'
import "./nav.css"
import firebase from "firebase"
import {auth} from "../firebaseConfig/firebase";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar";
import {ExitToAppSharp} from "@material-ui/icons"
import {NavLink} from "react-router-dom";

function Nav() {
    const [user,setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
          if(user)
          {setUser(user);}
        })
      },[user])
    const Login_inUSer=(e)=>{
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var user = result.user;
        setUser(user);
      }).catch((error) => {
        alert(error.message);
      });
      }
      const Log_out=(e)=>{
        e.preventDefault();
        auth.signOut();
        setUser(null);
      }
    return (
        <nav className="nav">
            <h1 className="header">Community App</h1>
                {
               user ? <div className="login_signup_button">
              <NavLink to='/user'>
              <Button  className="name"><strong>{user.displayName.toUpperCase()}</strong></Button>
              </NavLink>
              <NavLink to='/user'>
              <Avatar alt={user.photoURL} src={user.photoURL} style={{cursor :"pointer"}}/> 
              </NavLink>
              <IconButton onClick={Log_out}><ExitToAppSharp/></IconButton> 
              </div>
            :<div className="login_signup_button">
              <Button type="Submit" onClick={Login_inUSer}>Login In</Button>
            </div>
                } 
        </nav>
    )
}

export default Nav
