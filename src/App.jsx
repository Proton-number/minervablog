import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import SignUp from "./Components/signUp";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/signUp" element={<SignUp/>} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
