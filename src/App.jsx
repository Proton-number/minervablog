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
import Forgotpassword from "./Components/Forgotpassword";
import { useLocalStorage } from "@uidotdev/usehooks";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [mode, setMode] = useLocalStorage("theme", true);

  return (
    <>
      <LoadingComponent />
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
          <NavMobile
            mode={mode}
            setMode={setMode}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Nav
            mode={mode}
            setMode={setMode}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />

          <Routes>
            <Route
              exact
              path="/signUp"
              element={<Register mode={mode} setLoggedIn={setLoggedIn} />}
            />
            <Route exact path="/" element={<Home mode={mode} />} />
            <Route
              exact
              path="/singleBlog/:slug"
              element={<SingleBlog mode={mode} />}
            />
            <Route exact path="/blog" element={<Blogs mode={mode} />} />
            <Route
              exact
              path="/about/:authorId"
              element={<About mode={mode} />}
            />
            <Route
              exact
              path="/forgotpassword"
              element={<Forgotpassword mode={mode} />}
            />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
