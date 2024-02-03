import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { auth } from "../Config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();

  const resetHandler = async () => {
    setSending(true);

    await sendPasswordResetEmail(auth, email)
      .then((result) => {
        alert("Check your email for the password reset link");
        navigate("/signUp");
      })
      .catch((error) => {
        console.error(error.code, error.message);
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{ padding: { xs: "24px", sm: "30px", lg: "40px" } }}
      >
        <Stack sx={{ alignItems: "center" }} spacing={2}>
          <Typography variant="h5">
            <b>Forgot Password?</b>
          </Typography>
          <TextField
            variant="standard"
            label="Enter email address..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
    </Box>
  );
}

export default Forgotpassword;
