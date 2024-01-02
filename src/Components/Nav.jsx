import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  const font = createTheme({
    typography: {
      fontFamily: "Sevillana, cursive",
    },
  });

  return (
    <>
      <AppBar sx={{ padding: 1.2, backgroundColor:'white', color:'black' }} elevation={0}>
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
            <Link
              to="/signUp"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                Sign Up
              </Typography>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
