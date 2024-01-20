import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { auth, db } from "../Config/Firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

function Comments({ blogId }) {
  const [comments, setComments] = useLocalStorage(`${blogId}-comments`, []);
  const [commentValues, setCommentValues] = useLocalStorage(
    `${blogId}-commentValues`,
    []
  );

  const user = auth.currentUser;
  const [userPhoto, setUserPhoto] = useState(user?.photoURL ?? "");
  const [userName, setUserName] = useState(user?.displayName ?? "");

  const timeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = now - commentTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    }
  };
  const commentCollectionRef = collection(db, "comments");

  const commentHandler = async () => {
    const timestamp = new Date().toISOString();
    //upadating locally
    //updating firestore
    const commentDocRef = await addDoc(commentCollectionRef, {
      comments,
      user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timestamp,
    });

    const newCommentId = commentDocRef.id;

    setCommentValues([
      ...commentValues,
      { id: newCommentId, comments, userPhoto, userName, timestamp },
    ]);
    setComments("");
    console.log(newCommentId);
  };

  const deleteHandler = async (commentId) => {
    try {
      // Get a reference to the specific comment document to delete
      const commentDocRef = doc(db, "comments", commentId);

      // Delete the comment from Firestore
      await deleteDoc(commentDocRef);

      // Remove the comment from local state using the correct commentId
      const updatedCommentValues = commentValues.filter(
        (comment) => comment.id !== commentId
      );
      setCommentValues(updatedCommentValues);

      console.log("Comment deleted successfully:", commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
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
            {userPhoto && (
              <Avatar
                src={userPhoto}
                alt="userPhoto"
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
            )}
            <TextField
              placeholder="Comment"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              type="text"
              multiline
              rows={6}
              sx={{ width: { lg: "600px" } }}
            />
            <Button
              variant="contained"
              onClick={commentHandler}
              sx={{ textTransform: "none" }}
            >
              Comment
            </Button>
          </Stack>

          {commentValues.map((comment) => (
            <React.Fragment key={comment.id}>
              <Stack
                direction="row"
                sx={{ alignItems: "center", marginTop: "34px" }}
                spacing={4}
              >
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    src={comment.userPhoto}
                    alt="userPhoto"
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body1">
                    <b>{comment.userName}</b>
                  </Typography>
                  <Typography sx={{ opacity: "60%" }}>
                    {timeAgo(comment.timestamp)}
                  </Typography>
                </Stack>
                {comment.id !== auth.currentUser.uid && (
                  <IconButton
                    onClick={() => {
                      console.log("Comment ID being passed:", comment.id);
                      deleteHandler(comment.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
              <Typography variant="subtitle1" sx={{ marginLeft: "60px" }}>
                {comment.comments}
              </Typography>
            </React.Fragment>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
