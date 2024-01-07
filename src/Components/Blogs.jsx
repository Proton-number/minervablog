import { Box, Stack, Typography, Paper, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { Link } from "react-router-dom";
import { bouncy } from "ldrs";
import { motion } from "framer-motion";

function Blogs() {
  const [blogs, setBlogs] = useState(null);
  bouncy.register();

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
      <Box>
        <l-bouncy size="45" speed="1.75" color="hsl(229, 100%, 23%)"></l-bouncy>
      </Box>
    );

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .2, duration: 1 }}
    >
      <Grid
        columns={{ lg: 10 }}
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: { xs: "40px", sm: "50px", lg: "60px" },
          marginTop: { xs: "40px", sm: "30px", lg: 0 },
        }}
      >
        {blogs &&
          blogs.map((blog, index) => (
            <Grid item key={index} lg={5}>
              <Link
                to={"/singleBlog/" + blog.slug.current}
                style={{ color: "inherit", textDecoration: "none" }}
                key={blog.slug.current}
              >
                <Paper elevation={8} sx={{ borderRadius: "15px" }}>
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
                           borderTopRightRadius:'15px',
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
