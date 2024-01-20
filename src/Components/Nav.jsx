import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  createTheme,
  ThemeProvider,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";

function Nav({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  const font = createTheme({
    typography: {
      fontFamily: "Sevillana, cursive",
    },
  });

  const logOut = async () => {
    try {
      await signOut(auth).then(() => {
        setLoggedIn(false);
        localStorage.clear();
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.5 }}
        id="desktopNav"
        sx={{ padding: 1.2, backgroundColor: "white", color: "black" }}
        elevation={0}
      >
        <Toolbar>
          <ThemeProvider theme={font}>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              menervaBlog
            </Typography>
          </ThemeProvider>

          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                Home
              </Typography>
            </Link>

            {!loggedIn ? (
              <Link
                to="/signUp"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="h6" sx={{ cursor: "pointer" }}>
                  Sign Up
                </Typography>
              </Link>
            ) : (
              <>
                <Link
                  to="/blog"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="h6" sx={{ cursor: "pointer" }}>
                    Blogs
                  </Typography>
                </Link>

                <IconButton onClick={logOut}>
                  <LogoutIcon sx={{ color: "black" }} />
                </IconButton>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
