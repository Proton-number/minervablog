import React, { useState } from "react";
import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Stack,
  AppBar,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function NavMobile({ loggedIn, setLoggedIn }) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  let navigate = useNavigate();

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

  const font = createTheme({
    typography: {
      fontFamily: "Sevillana, cursive",
    },
  });

  return (
    <>
      <AppBar
        id="mobileNav"
        sx={{ padding: 1.2, backgroundColor: "white", color: "black" }}
        elevation={0}
      >
        <Toolbar>
          <ThemeProvider theme={font}>
            <Typography variant="h3" sx={{ flexGrow: 1 }}>
              menervaBlog
            </Typography>
          </ThemeProvider>

          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => setisDrawerOpen(true)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
          sx: {
            background: "rgba(47,56,76,0.5)",
            backdropFilter: "blur(19px)",
          },
        }}
        id="drawer"
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        <Box width="350px" role="presentation">
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="close-icon"
              onClick={() => setisDrawerOpen(false)}
            >
              <CloseIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          </Toolbar>

          <Stack
            spacing={8}
            style={{ textAlign: "center", color: "white", padding: "35px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                Home
              </Typography>
            </Link>
            {!loggedIn ? (
              <Link
                to="/signUp"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="h6" sx={{ cursor: "pointer" }}>
                  Sign Up
                </Typography>
              </Link>
            ) : (
              <>
                <Link
                  to="/blog"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6" sx={{ cursor: "pointer" }}>
                    Blogs
                  </Typography>
                </Link>
                <Link
                  to="/createBlog"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography variant="h6" sx={{ cursor: "pointer" }}>
                    CreateBlog
                  </Typography>
                </Link>
                <IconButton onClick={logOut}>
                  {" "}
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </>
            )}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default NavMobile;
