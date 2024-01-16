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
import LoadingComponent from "./Components/LoadingComponent";
import { motion } from "framer-motion";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  return (
    <>
      {/* <LoadingComponent /> */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 2.9,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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