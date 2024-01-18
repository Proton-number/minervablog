import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Paper,
} from "@mui/material";
import React from "react";

function Comments() {
  return (
    <Box>
      <Typography variant="h5">Comments</Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
        elevation={3}
      >
        <Stack spacing={4} direction="row" sx={{ alignItems: "center" }}>
          <Box
            sx={{
              backgroundColor: "pink",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <TextField
            placeholder="Comment"
            type="text"
            multiline
            fullwidth
            rows={6}
            sx={{ width: { lg: "600px" } }}
          />
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
