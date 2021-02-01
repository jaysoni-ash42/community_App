import React, { useEffect, useState } from 'react';
import "./App.css"
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Search from "./Search";
import { auth } from "../firebaseConfig/firebase";
import { useStateValue } from "../StateProvider";
import { SearchPost, SearchUser } from "../Context";
import { WbIncandescentTwoTone } from '@material-ui/icons';

function App() {

  const [{ user }, dispatch] = useStateValue();
  const [searchuser, setValue] = useState([])
  const [searchpost, setPost] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "setuser",
          payload: user
        })
      }
      else {
        dispatch({
          type: "logout",
          payload: null
        })
      }
    })
  }, [user, dispatch]);
  return (
    <div className="app">
      <Router>
        <SearchPost.Provider value={{ searchpost, setPost }}>
          <SearchUser.Provider value={{ searchuser, setValue }}>
            <Nav />
            <Switch>
              <Route path="/user/:username" exact render={(props) => (user != null ? <Users /> : <Redirect to='/' />)} />
              <Route path="/" exact render={(props) => (<Home />)} />
              <Route path="/search/:username" exact render={(props) => (<Search />)} />
            </Switch>
          </SearchUser.Provider>
        </SearchPost.Provider>
      </Router>
    </div>
  );
};
export default App;
