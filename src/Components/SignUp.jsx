import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import loginImg from "/src/images/Outer space-amico.png";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";

function SignUp() {
  const [showLogin, setShowLogin] = useState(true);

  const btnHandler = async () => {
    try {
        await signInWithPopup(auth, googleProvider).then((result) => {
          localStorage.setItem("loggedIn", true);
        });
      } catch (err) {
        console.log(err);
      }
  };

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{ padding: { xs: "24px", sm: "30px", lg: "40px" } }}
      >
        <Stack
          direction={{ sm: "row" }}
          sx={{ alignItems: "center" }}
          spacing={{ sm: 6, lg: 10 }}
        >
          <Box
            src={loginImg}
            sx={{
              width: { xs: "240px", sm: "330px", lg: "440px" },
              height: { xs: "230px", sm: "330px", lg: "440px" },
            }}
            component={motion.img}
          />

          {showLogin ? (
            //  SIGN UP PART
            <Stack sx={{ textAlign: "center" }} spacing={2}>
              <Typography variant="h4">
                <b>SIGN UP</b>
              </Typography>
              <TextField label="Email" />
              <TextField label="Password" type="password" />
              <Typography></Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "hsl(182, 56%, 58%)",
                  "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                }}
                disableElevation
              >
                Sign Up
              </Button>
              <Typography sx={{ opacity: "60%" }}>
                Or register with your Google account
              </Typography>
              <Button
                sx={{
                  backgroundColor: "hsl(182, 56%, 58%)",
                  "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                }}
                disableElevation
                variant="contained"
                endIcon={<GoogleIcon />}
                onClick={btnHandler}
              >
                Sign Up with{" "}
              </Button>
              <Typography>
                Do you have an account?
                <span
                  onClick={() => setShowLogin(false)}
                  style={{ color: "hsl(184, 49%, 45%)", cursor: "pointer" }}
                >
                  {" "}
                  Login here
                </span>
              </Typography>
            </Stack>
          ) : (
            // LOGIN PART
            <Stack sx={{ textAlign: "center" }} spacing={2}>
              <Typography variant="h4">
                <b>LOGIN</b>
              </Typography>
              <TextField label="Email" />
              <TextField label="Password" type="password" />
              <Typography></Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "hsl(182, 56%, 58%)",
                  "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                }}
                disableElevation
              >
                Login
              </Button>
              <Typography sx={{ opacity: "60%" }}>
                Or login with your Google account
              </Typography>
              <Button
                sx={{
                  backgroundColor: "hsl(182, 56%, 58%)",
                  "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                }}
                disableElevation
                variant="contained"
                endIcon={<GoogleIcon />}
                onClick={btnHandler}
              >
                login with{" "}
              </Button>
              <Typography>
                Don't have an account?
                <span
                  onClick={() => setShowLogin(true)}
                  style={{ color: "hsl(184, 49%, 45%)", cursor: "pointer" }}
                >
                  {" "}
                  Sign up here
                </span>
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default SignUp;
