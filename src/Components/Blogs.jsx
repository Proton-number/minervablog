import { Box, Stack, Typography, Paper, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "./Loader";

function Blogs({ mode }) {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
      title,
      description,
      author ->{
        name,
        nickname
      },
      slug,
      mainImage{
        asset ->{
          _id,
          url
        },
        alt
      }
    }`
      )
      .then((data) => {
        setTimeout(() => setBlogs(data), 1000);
      })

      .catch(console.error);
  }, []);

  if (!blogs)
    return (
      <>
        <Loader mode={mode} />
      </>
    );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      sx={{ backgroundColor: !mode ? "hsl(0, 0%, 15%)" : "white" }}
    >
      <Grid
        columns={{ sm: 7, lg: 10 }}
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { xs: "40px", sm: "50px", lg: "60px" },
        }}
      >
        {blogs &&
          blogs.map((blog, index) => (
            <Grid
              sx={{ marginTop: { xs: "40px", sm: "30px", lg: 0 } }}
              item
              key={index}
              sm={3}
              lg={5}
            >
              <Link
                to={"/singleBlog/" + blog.slug.current}
                style={{ color: "inherit", textDecoration: "none" }}
                key={blog.slug.current}
              >
                <Paper
                  elevation={8}
                  sx={{
                    borderRadius: "15px",
                    color: mode ? "black" : "white",
                    backgroundColor: !mode ? "hsl(0, 0%, 20%)" : "white",
                  }}
                >
                  <Stack>
                    <Box
                      component={motion.div}
                      sx={{
                        overflow: "hidden",
                      }}
                    >
                      {blog.mainImage && (
                        <Box
                          component={motion.img}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.05, opacity: "96%" }}
                          sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                          src={blog.mainImage.asset.url}
                          alt={blog.mainImage.alt}
                        />
                      )}
                    </Box>
                    <Stack spacing={1} sx={{ padding: "20px" }}>
                      <Typography variant="p">
                        <b> Title:</b> {blog.title}
                      </Typography>

                      <Typography variant="p">
                        <b> By:</b> {blog.author.name}
                      </Typography>

                      <Typography variant="p">
                        <b> Description:</b> {blog.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Blogs;
