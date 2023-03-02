import { Component } from "react";
import React from "react";
import Navbar from "./component/Navbar";
import Users from "./component/Users";
import AddUser from "./component/AddUser";
import Test from "./component/Test";

import './App.css';

class App extends Component{
  
render() {
  return (
    <div className="container">
      <Test test="deneme"></Test> 
      <Navbar title = "User App"></Navbar>
      <hr/> 
      <AddUser></AddUser>
      <Users></Users>

    </div>
  );
}
}
export default App;
