import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Blogs from "./Components/Blogs";
import { Box } from "@mui/material";
import NavMobile from "./Components/NavMobile";
import Register from "./Components/Register";
import SingleBlog from "./Components/SingleBlog";
import About from "./Components/About";

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
            <Route exact path="/singleBlog/:slug" element={<SingleBlog />} />
            <Route exact path="/blog" element={<Blogs />} />
            <Route exact path="/about/:authorId" element={<About />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
