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
import React, { useState, useEffect } from "react";
import { auth, db } from "../Config/Firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Comments({ blogId }) {
  const [comments, setComments] = useLocalStorage(`${blogId}-comments`, "");
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
    await addDoc(commentCollectionRef, {
      blogId,
      comments,
      user: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        photo: auth.currentUser.photoURL,
      },
      timestamp,
    });
    setComments("");
  };

  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(
        query(commentCollectionRef, where("blogId", "==", blogId))
      );
      const sortedComments = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setCommentValues(sortedComments);
    };
    getComments();
  }, [blogId, commentValues]);

  const deleteHandler = async (id) => {
    const commentDocRef = doc(db, "comments", id);
    await deleteDoc(commentDocRef);
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
          <Stack
            spacing={{ xs: 4, sm: 4 }}
            direction={{ sm: "row" }}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
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
              sx={{
                width: { xs: "340px", lg: "600px" },
              }}
            />
            <Button
              variant="contained"
              onClick={commentHandler}
              sx={{
                textTransform: "none",
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "hsl(0, 0%, 13%)",
                },
              }}
            >
              Comment
            </Button>
          </Stack>

          {commentValues.map((comment, index) => {
            return (
              <React.Fragment key={index}>
                <Stack
                  direction="row"
                  sx={{
                    marginTop: "34px",
                    marginLeft: "20%",
                  }}
                  spacing={{ lg: 20 }}
                >
                  <Stack
                    direction="row"
                    spacing={3}
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      src={comment.user.photo}
                      alt="userPhoto"
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="body1">
                      <b>{comment.user.name}</b>
                    </Typography>
                    <Typography sx={{ opacity: "60%" }}>
                      {timeAgo(comment.timestamp)}
                    </Typography>
                  </Stack>
                  {comment.user.id === auth.currentUser.uid && (
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

                <Typography
                  variant="subtitle1"
                  sx={{
                    textAlign: "justify",
                    width: { lg: "50%" },
                    margin: "auto",
                  }}
                >
                  {comment.comments}
                </Typography>
              </React.Fragment>
            );
          })}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
