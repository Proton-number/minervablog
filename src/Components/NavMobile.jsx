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
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function NavMobile({ loggedIn, setLoggedIn, mode, setMode }) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();

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
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 0.5 }}
        id="mobileNav"
        sx={{
          padding: 1.2,
          backgroundColor:
            location.pathname === "/" || !mode ? "transparent" : "transparent",
          color: location.pathname === "/" || !mode ? "white" : "black",
          position: location.pathname === "/" ? "absolute" : "fixed",
        }}
        elevation={0}
      >
        <Toolbar>
          <ThemeProvider theme={font}>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              menervaBlog
            </Typography>
          </ThemeProvider>

          <Stack spacing={0.5} direction="row" sx={{ alignItems: "center" }}>
            {mode ? (
              <IconButton onClick={() => setMode(false)}>
                <DarkModeIcon
                  sx={{
                    display: location.pathname === "/" ? "none" : "block",
                    color: mode ? "black" : "white",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={() => setMode(true)}>
                <LightModeIcon
                  sx={{
                    color: mode ? "black" : "white",
                    display: location.pathname === "/" ? "none" : "block",
                  }}
                />
              </IconButton>
            )}

            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => setisDrawerOpen(true)}
            >
              <MenuIcon
                fontSize="large"
                sx={{
                  color: location.pathname === "/" || !mode ? "white" : "black",
                }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        PaperProps={{
          sx: {
            background: "rgba(126,113,94,0.5)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(126,113,94,0.25)",
          },
        }}
        id="drawer"
        anchor="top"
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        <Box>
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="close-icon"
              onClick={() => setisDrawerOpen(false)}
            >
              <CloseIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>

          <Stack
            spacing={8}
            style={{ textAlign: "center", color: "white", padding: "35px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography
                onClick={() => setisDrawerOpen(false)}
                variant="h6"
                sx={{ cursor: "pointer" }}
              >
                Home
              </Typography>
            </Link>
            {!loggedIn ? (
              <Link
                to="/signUp"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography
                  onClick={() => setisDrawerOpen(false)}
                  variant="h6"
                  sx={{ cursor: "pointer" }}
                >
                  Sign In
                </Typography>
              </Link>
            ) : (
              <>
                <Link
                  to="/blog"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Typography
                    onClick={() => setisDrawerOpen(false)}
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                  >
                    Blogs
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
