import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState } from "react";

function Comments({ blogId }) {
  const [comments, setComments] = useLocalStorage(`${blogId}-comments`, "");
  const [commentValues, setCommentValues] = useLocalStorage(
    `${blogId}-commentValues`,
    []
  );

  const commentHandler = () => {
    setCommentValues([...commentValues, { comments }]);
    setComments("");
  };

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
        <Stack>
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
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              type="text"
              multiline
              fullwidth
              rows={6}
              sx={{ width: { lg: "600px" } }}
            />
            <Button variant="contained" onClick={commentHandler}>
              click me
            </Button>
          </Stack>

          {commentValues.map((comment, index) => (
            <>
              <Stack
                direction="row"
                sx={{ alignItems: "center", marginTop: "50px" }}
                spacing={2}
                key={index}
              >
                <Box
                  sx={{
                    backgroundColor: "pink",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="h5">Name</Typography>
                <Typography sx={{ opacity: "60%" }}>
                  It was made blah days ago
                </Typography>
              </Stack>
              <Typography variant="h5">{comment.comments}</Typography>
            </>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
