import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "/src/config/firebase.jsx";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

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
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar
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
                <Link
                  to="/createBlog"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography variant="h6" sx={{ cursor: "pointer" }}>
                    CreateBlog
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
