import React, { useState, useEffect } from 'react';
import "./App.css"
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Search from "./Search";
import { userContext, Searchpost, Searchuser } from "./userContext";
import { auth } from "../firebaseConfig/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [searchpost, setSearchpost] = useState([]);
  const [searchuser, setSearchuser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
    })
  }, [user]);
  return (
    <div className="app">
      <Router>
        <userContext.Provider value={{ user, setUser }}>
          <Searchpost.Provider value={{ searchpost, setSearchpost }}>
            <Searchuser.Provider value={{ searchuser, setSearchuser }}>
              <Nav />
              <Switch>
                <Route path="/user/:username" exact render={(props) => (user != null ? <Users /> : <Redirect to='/' />)} />
                <Route path="/" exact render={(props) => (<Home />)} />
                <Route path="/search/:username" exact render={(props) => (Object.keys(searchuser).length > 0 ? <Search /> : <Redirect to='/' />)} />
              </Switch>
            </Searchuser.Provider>
          </Searchpost.Provider>
        </userContext.Provider>
      </Router>
    </div>
  );
};
export default App;
