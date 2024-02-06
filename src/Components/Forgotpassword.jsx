import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  TextField,
  Paper,
  createTheme,
  ThemeProvider,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { auth } from "../Config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

function Forgotpassword({ mode }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false); //for loading animaion for button
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const resetHandler = async () => {
    setSending(true);

    await sendPasswordResetEmail(auth, email)
      .then((result) => {
        setSuccess(true);
        setEmail("");

        setTimeout(() => {
          // Navigate after 3 seconds
          navigate("/signUp");
        }, 2500);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setError(error.code);
      })
      .finally(() => {
        setSending(false);
      });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: mode ? "hsl(0, 0%, 13%)" : "#ffffff",
      },
    },
  });

  return (
    <Stack
      spacing={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: !mode ? "hsl(0, 0%, 15%)" : "white",
        color: !mode ? "black" : "white",
      }}
    >
      {success && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Alert variant="filled" severity="success">
            Check your Email for a reset link
          </Alert>
        </Box>
      )}
      {error && !success && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Box>
      )}
      <Paper
        elevation={4}
        sx={{
          padding: { xs: "24px", sm: "30px", lg: "40px" },
          color: mode ? "black" : "white",
          backgroundColor: !mode ? "hsl(0, 0%, 20%)" : "white",
          borderRadius: "30px",
        }}
      >
        <Stack sx={{ alignItems: "center" }} spacing={2}>
          <Typography variant="h5">
            <b>Forgot Password?</b>
          </Typography>
          <ThemeProvider theme={theme}>
            <TextField
              variant="standard"
              label={
                <Typography
                  variant="body2"
                  sx={{ color: mode ? "black" : "white" }}
                >
                  Enter Email Address...
                </Typography>
              }
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                inputProps: {
                  style: {
                    color: mode ? "black" : "white",
                  },
                },
              }}
            />
          </ThemeProvider>
          <LoadingButton
            loading={sending}
            variant="contained"
            sx={{
              borderRadius: "20px",
              width: "60%",
              padding: "10px",
              backgroundColor: "hsl(182, 56%, 58%)",
              "&:hover": { backgroundColor: "hsl(184, 49%, 45%)" },
            }}
            disableElevation
            onClick={resetHandler}
          >
            Reset
          </LoadingButton>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Forgotpassword;
