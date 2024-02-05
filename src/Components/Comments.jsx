import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Paper,
  Button,
  IconButton,
  createTheme,
  ThemeProvider,
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

function Comments({ blogId, mode }) {
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
      return `${days} ${days === 1 ? "day" : "days"} ago `;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ago `;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "min" : "mins"} ago `;
    } else {
      return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago `;
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
    // Optimistically update the local state
    setCommentValues((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );

    try {
      await deleteDoc(commentDocRef);
    } catch (error) {
      console.error("Error deleting comment:", error);
      // If there's an error, revert the local state back to the previous state
      setCommentValues((prevComments) => [...prevComments]);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: mode ? "hsl(0, 0%, 13%)" : "#ffffff",
      },
    },
  });

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ marginLeft: { xs: "20px", sm: "40px", lg: "80px" } }}
      >
        <b>Comments</b>
      </Typography>
      <Paper
        sx={{
          padding: "25px",
          width: { xs: "75%", sm: "90%" },
          margin: "auto",
          color: mode ? "black" : "white",
          backgroundColor: !mode ? "hsl(0, 0%, 20%)" : "white",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        elevation={5}
      >
        <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
          <Stack
            spacing={{ xs: 4, sm: 4 }}
            direction={{ sm: "row" }}
            sx={{ alignItems: "center" }}
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
            <ThemeProvider theme={theme}>
              <TextField
                color="primary"
                InputProps={{
                  inputProps: {
                    style: {
                      color: mode ? "black" : "white",
                    },
                  },
                }}
                placeholder="Comment"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                type="text"
                multiline
                rows={6}
                sx={{
                  width: { xs: "240px", sm: "500px", lg: "600px" },
                  backgroundColor: !mode ? "hsl(0, 0%, 13%)" : "white",
                }}
              />
            </ThemeProvider>
            <Button
              variant="contained"
              onClick={commentHandler}
              sx={{
                textTransform: "none",
                color: !mode ? "black" : "white",
                backgroundColor: mode ? "black" : "white",
                "&:hover": {
                  backgroundColor: !mode ? "hsl(0, 0%, 13%)" : "white",
                  color: mode ? "black" : "white",
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
                  spacing={3}
                  sx={{
                    marginTop: "40px",
                    padding: { xs: "30px" },
                    width: {sm:"90%",lg:"50%"},
                  }}
                >
                  <Stack
                    spacing={{ xs: 1.2, lg: 8 }}
                    direction="row"
                    sx={{ alignItems: "center" }}
                  >
                    <Avatar
                      src={comment.user.photo}
                      alt="userPhoto"
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                    <Typography variant="body2">
                      <b>{comment.user.name}</b>
                    </Typography>
                    <Typography sx={{ opacity: "60%" }}>
                      {timeAgo(comment.timestamp)}
                    </Typography>
                    {comment.user.id === auth.currentUser.uid && (
                      <Button
                        onClick={() => {
                          console.log("Comment ID being passed:", comment.id);
                          deleteHandler(comment.id);
                        }}
                        sx={{
                          color: "hsl(0, 100%, 40%)",
                          "&:hover": {
                            backgroundColor: "none",
                          },
                        }}
                        startIcon={
                          <DeleteIcon sx={{ color: "hsl(0, 100%, 40%)" }} />
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </Stack>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: "justify",
                    }}
                  >
                    {comment.comments}
                  </Typography>
                </Stack>
              </React.Fragment>
            );
          })}
        </Stack>
      </Paper>
    </Box>
  );
}

export default Comments;
