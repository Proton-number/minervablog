import { Box, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { bouncy } from "ldrs";
import { motion } from "framer-motion";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState(null);
  bouncy.register();

  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            author ->{
                name,
                _id,
                nickname
              },
            mainImage{
                asset -> {
                    _id,
                    url
                }
            },
            body,
            "name": author-> name,
            "authorImage": author-> image
        }`
      )
      .then((data) => {
        setTimeout(() => setSingleBlog(data[0]), 1000);
      })
      .catch(console.error);
  }, [slug]);

  if (!singleBlog)
    return (
      <Box>
        <l-bouncy size="45" speed="1.75" color="hsl(229, 100%, 23%)"></l-bouncy>
      </Box>
    );

  // STYLING THE IMAGE IN BLOCK CONTENT
  const customSerializers = {
    types: {
      image: ({ node }) => {
        const imageUrl = builder.image(node.asset).width(400).url(); // Adjust width as needed
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={node.alt}
              sx={{ width: { sm: "450px", lg: "900px" }, height: "auto" }} // Adjust styles as needed
            />
          </Box>
        );
      },
      block: ({ children }) => (
        <Typography
          variant="body1" // You can adjust the variant based on your design
          sx={{ textAlign: "justify", margin: "10px 0" }} // Add the style to justify the text
        >
          {children}
        </Typography>
      ),
    },
  };

  // MAIN CONTENT
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0, y: "400px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type:'spring', stiffness: 60 }}
      spacing={3}
      sx={{
        padding: {
          xs: "50px",
          sm: "60px",
          lg: "100px",
        },
        marginTop: {
          xs: "40px",
          lg: 0,
        },
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {singleBlog.title}
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "auto",
          }}
          src={singleBlog.mainImage.asset.url}
          alt={singleBlog.mainImage.alt}
        />
      </Box>

      <Stack spacing={4} direction="row" sx={{ alignItems: "center" }}>
        {singleBlog.authorImage && (
          <Box
            component="img"
            sx={{
              width: { xs: "70px", sm: "120px" },
              height: { xs: "70px", sm: "120px" },
              borderRadius: "50%",
            }}
            src={urlFor(singleBlog.authorImage).url()}
            alt={singleBlog.name}
          />
        )}

        <Link
          to={"/about/" + singleBlog.author._id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="p">
            <b>{singleBlog.name}</b>
          </Typography>
        </Link>
      </Stack>

      {/* BlockContent */}

      <BlockContent
        blocks={singleBlog.body}
        projectId="0kqagvby"
        dataset="production"
        serializers={customSerializers}
      />
    </Stack>
  );
}

export default SingleBlog;
