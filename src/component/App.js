import React,{useState,useEffect} from 'react';
import "./App.css"
import Nav from "./Nav";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import {auth} from "../firebaseConfig/firebase";

function App(){
  const [user,setUser]=useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user)
      {setUser(user);}
    })
  },[])
  return (
    <Router>
    <div className="app">
      <Nav />
      <Switch>
       <Route path="/" exact component={Home}/>
        <Route path="/user" render={props=>(<Users user={user}/>)}/>
      </Switch>
    </div> 
    </Router>
  );
};
export default App;
