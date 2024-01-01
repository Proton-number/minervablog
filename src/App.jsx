import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {


  return (
    <>
    
      <Router>
      <Nav />
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
