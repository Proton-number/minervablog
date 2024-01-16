import React, { useState, useEffect } from "react";
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
import loginImg from "/src/images/Mail sent-pana.png";
import GoogleIcon from "@mui/icons-material/Google";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { bouncy } from "ldrs";

function Register({ setLoggedIn }) {
  const [showLogin, setShowLogin] = useState(true);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true);

  bouncy.register();

  const btnHandler = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        localStorage.setItem("loggedIn", true);
        setLoggedIn(true);
        navigate("/blog");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const signUpBtn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      navigate("/blog");
    } catch (err) {
      console.log(err);
    }
    if (signUpEmail.trim() === "" || !signUpEmail.includes("@")) {
      setError((prevError) => ({ ...prevError, email: true }));
    } else {
      setError((prevError) => ({ ...prevError, email: false }));
    }
    
    if (signUpPassword.trim() === "" || signUpPassword.length < 6) {
      setError((prevError) => ({ ...prevError, password: true }));
    } else {
      setError((prevError) => ({ ...prevError, password: false }));
    }
  };

  const loginBtn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      navigate("/blog");
    } catch (err) {
      console.log(err);
    }
  };

  const signupFont = createTheme({
    typography: {
      fontFamily: "Signika, sans-serif",
    },
  });

  useEffect(() => {
    setTimeout(() => isLoading(false), 2590);
  }, []);

  return (
    <>
      {loading ? (
        <l-bouncy size="45" speed="1.75" color="hsl(229, 100%, 23%)"></l-bouncy>
      ) : (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          sx={{ marginTop: { xs: "80px" } }}
        >
          <ThemeProvider theme={signupFont}>
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
                    width: { xs: "240px", sm: "330px", lg: "460px" },
                    height: { xs: "230px", sm: "330px", lg: "460px" },
                  }}
                  component={motion.img}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {showLogin ? (
                  //  SIGN UP PART
                  <Stack sx={{ textAlign: "center" }} spacing={2}>
                    <Typography variant="h4">
                      <b>SIGN UP</b>
                    </Typography>
                    <TextField
                      label="Email"
                      type="email"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      error={error.email}
                      helperText={
                        error.email ? "Enter a valid email address" : ""
                      }
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      helperText={
                        error.password ? (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.25 },
                            }}
                          >
                            Enter a valid Password
                          </motion.div>
                        ) : (
                          "Password should be at least 6 characters"
                        )
                      }
                      error={error.password}
                    />
                    <Button
                      onClick={signUpBtn}
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
                        style={{
                          color: "hsl(184, 49%, 45%)",
                          cursor: "pointer",
                        }}
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
                    <TextField
                      label="Email..."
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <TextField
                      label="Password..."
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <Button
                      onClick={loginBtn}
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
                        style={{
                          color: "hsl(184, 49%, 45%)",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        Sign up here
                      </span>
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Paper>
          </ThemeProvider>
        </Box>
      )}
    </>
  );
}

export default Register;
