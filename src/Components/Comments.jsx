import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Paper,
  Button,
  IconButton,
  Popover,
} from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState } from "react";
import { auth, db } from "../Config/Firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

function Comments({ blogId }) {
  const [comments, setComments] = useLocalStorage(`${blogId}-comments`, "");
  const [commentValues, setCommentValues] = useLocalStorage(
    `${blogId}-commentValues`,
    []
  );
  const [anchorEl1, setAnchorEl1] = useState(null);

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
    setCommentValues([
      ...commentValues,
      { id: auth.currentUser.uid, comments, userPhoto, userName, timestamp },
    ]);
    setComments("");
    //updating firestore
    await addDoc(commentCollectionRef, {
      comments,
      commentValues,
      user: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timestamp,
    });
  };
  const deleteHandler = async (commentId) => {
    try {
      await deleteDoc(doc(commentCollectionRef, commentId));
      // Remove the deleted comment from the local state
      setCommentValues(
        commentValues.filter((comment) => comment.id !== commentId)
      );
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
                key={`avatar-${user.uid}`}
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
            <Button variant="contained" onClick={commentHandler}>
              click me
            </Button>
          </Stack>

          {commentValues.map((comment) => (
            <>
              <Stack
                direction="row"
                sx={{ alignItems: "center", marginTop: "34px" }}
                spacing={28}
                key={comment.id}
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
                <IconButton onClick={(e) => setAnchorEl1(e.currentTarget)}>
                  <MoreVertIcon />
                </IconButton>
                <Popover
                  anchorEl={anchorEl1}
                  open={Boolean(anchorEl1)}
                  onClose={() => setAnchorEl1(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  elevation={1}
                >
                  <Stack
                    spacing={1}
                    sx={{ alignItems: "center", padding: "10px" }}
                  >
                    <Stack direction="row" spacing={1.8}>
                      <EditIcon />
                      <Typography>Edit </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      onClick={() => deleteHandler(comment.id)}
                    >
                      <DeleteIcon />
                      <Typography>Delete </Typography>
                    </Stack>
                  </Stack>
                </Popover>
              </Stack>
              <Typography variant="h5" sx={{ marginLeft: "60px" }}>
                {comment.comments}
              </Typography>
            </>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
