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
  Divider,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { bouncy } from "ldrs";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  const [loginShowPassword, loginSetShowPassword] = useState(true);
  const [signUpShowPassword, signUpSetShowPassword] = useState(true);

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
              sx={{ padding: { xs: "24px", sm: "30px", lg: "60px" } }}
            >
              <Stack
                direction={{ sm: "row" }}
                sx={{ alignItems: "center" }}
                spacing={{ sm: 6, lg: 10 }}
              >
                {!showLogin ? (
                  //  SIGN UP PART
                  <Stack
                    sx={{ textAlign: "center", alignItems: "center" }}
                    spacing={2}
                  >
                    <Typography variant="h4">
                      <b>SIGN UP</b>
                    </Typography>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {signUpShowPassword ? (
                              <IconButton
                                onClick={() => {
                                  signUpSetShowPassword(false);
                                }}
                              >
                                <VisibilityOff />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  signUpSetShowPassword(true);
                                }}
                              >
                                <Visibility />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      label="Password..."
                      type={!signUpShowPassword ? "password" : "text"}
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
                        borderRadius: "20px",
                        width: "60%",
                        padding: "10px",
                        backgroundColor: "hsl(182, 56%, 58%)",
                        "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                      }}
                      disableElevation
                    >
                      Sign Up
                    </Button>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Divider sx={{ width: "100%" }} />
                      <Typography sx={{ opacity: "60%" }}>or</Typography>
                      <Divider sx={{ width: "100%" }} />
                    </Stack>
                    <Box sx={{ cursor: "pointer" }} onClick={btnHandler}>
                      <Stack direction="row" spacing={2}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid"
                          viewBox="0 0 256 262"
                        >
                          <path
                            fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          ></path>
                          <path
                            fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          ></path>
                        </svg>
                        <Typography> Sign Up with Google</Typography>
                      </Stack>
                    </Box>
                    <Typography>
                      Do you have an account?
                      <span
                        onClick={() => setShowLogin(true)}
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
                  <Stack
                    sx={{ textAlign: "center", alignItems: "center" }}
                    spacing={2}
                  >
                    <Typography variant="h4">
                      <b>LOGIN</b>
                    </Typography>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            {loginShowPassword ? (
                              <IconButton
                                onClick={() => {
                                  loginSetShowPassword(false);
                                }}
                              >
                                <VisibilityOff />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  loginSetShowPassword(true);
                                }}
                              >
                                <Visibility />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      label="Password..."
                      type={!loginShowPassword ? "password" : "text"}
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
                    <Typography
                      variant="subtitle2"
                      sx={{
                        opacity: "60%",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                          opacity: "100%",
                        },
                      }}
                      onClick={() => {
                        navigate("/forgotpassword");
                      }}
                    >
                      Forgot password?
                    </Typography>
                    <Button
                      onClick={loginBtn}
                      variant="contained"
                      sx={{
                        borderRadius: "20px",
                        width: "60%",
                        padding: "10px",
                        backgroundColor: "hsl(182, 56%, 58%)",
                        "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
                      }}
                      disableElevation
                    >
                      Login
                    </Button>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Divider sx={{ width: "100%" }} />
                      <Typography sx={{ opacity: "60%" }}>or</Typography>
                      <Divider sx={{ width: "100%" }} />
                    </Stack>
                    <Box sx={{ cursor: "pointer" }} onClick={btnHandler}>
                      <Stack direction="row" spacing={2}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid"
                          viewBox="0 0 256 262"
                        >
                          <path
                            fill="#4285F4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          ></path>
                          <path
                            fill="#EB4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          ></path>
                        </svg>
                        <Typography> Login with Google</Typography>
                      </Stack>
                    </Box>
                    <Typography>
                      Don't have an account?
                      <span
                        onClick={() => setShowLogin(false)}
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
