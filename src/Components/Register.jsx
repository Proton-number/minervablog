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
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    loginEmail: false,
    loginPassword: false,
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
      await createUserWithEmailAndPassword(auth, signUp.email, signUp.password);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      navigate("/blog");
    } catch (err) {
      console.log(err);
    }
    if (signUp.email.trim() === "" || !signUp.email.includes("@")) {
      setError((prevError) => ({ ...prevError, email: true }));
    } else {
      setError((prevError) => ({ ...prevError, email: false }));
    }

    if (signUp.password.trim() === "" || signUp.password.length < 6) {
      setError((prevError) => ({ ...prevError, password: true }));
    } else {
      setError((prevError) => ({ ...prevError, password: false }));
    }
  };

  const loginBtn = async () => {
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      navigate("/blog");
    } catch (err) {
      console.log(err);
    }
    if (login.email.trim() === "" || !login.email.includes("@")) {
      setError((prevError) => ({ ...prevError, loginEmail: true }));
    } else {
      setError((prevError) => ({ ...prevError, loginEmail: false }));
    }

    if (login.password.trim() === "" || login.password.length < 6) {
      setError((prevError) => ({ ...prevError, loginPassword: true }));
    } else {
      setError((prevError) => ({ ...prevError, loginPassword: false }));
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
            duration: 1.2,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
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
                {showLogin ? (
                  //  SIGN UP PART
                  <Stack sx={{ textAlign: "center" }} spacing={2}>
                    <Typography variant="h4">
                      <b>SIGN UP</b>
                    </Typography>
                    <TextField
                      label="Email"
                      type="email"
                      value={signUp.email}
                      onChange={(e) =>
                        setSignUp({ ...signUp, email: e.target.value })
                      }
                      error={error.email}
                      helperText={
                        error.email ? (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.25 },
                            }}
                          >
                            Enter a valid email address
                          </motion.div>
                        ) : (
                          ""
                        )
                      }
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={signUp.password}
                      onChange={(e) =>
                        setSignUp({ ...signUp, password: e.target.value })
                      }
                      helperText={
                        error.password ? (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.22 },
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
                      value={login.email}
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                      error={error.loginEmail}
                      helperText={
                        error.loginEmail ? "Enter a valid email address" : ""
                      }
                    />
                    <TextField
                      label="Password..."
                      type="password"
                      value={login.password}
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                      helperText={
                        error.loginPassword ? (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.22 },
                            }}
                          >
                            Enter a valid Password
                          </motion.div>
                        ) : (
                          "Password should be at least 6 characters"
                        )
                      }
                      error={error.loginPassword}
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
