import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Blogs from "./Components/Blogs";
import CreateBlog from "./Components/CreateBlog";
import { Box } from "@mui/material";
import NavMobile from "./Components/NavMobile";
import Register from "./Components/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  return (
    <>
      <Box>
        <Router>
          <NavMobile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route
              exact
              path="/signUp"
              element={<Register setLoggedIn={setLoggedIn} />}
            />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/blog" element={<Blogs />} />
            <Route exact path="/createBlog" element={<CreateBlog />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
