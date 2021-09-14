import React from "react";

import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import userInfo from "./userInfo/userInfo.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";


function App() {
  return (
    <>
      <HashRouter>
        <Header /> 
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/user" exact component={userInfo} />  
        </Switch>
        <Footer /> 
      </HashRouter>
    </>
  );
}

export default App;