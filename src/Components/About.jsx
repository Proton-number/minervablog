import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { bouncy } from "ldrs";
import { Box, Stack, Typography } from "@mui/material";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function About() {
  const [author, setAuthor] = useState(null);
  bouncy.register();

  const { authorId } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[author._id == "${authorId}"]{
             name,
             nickname,
             bio,
              "authorImage": image.asset->url
          }`
      )
      .then((data) => {
        setTimeout(() => setAuthor(data[0]), 1000);
      })
      .catch(console.error);
  }, [authorId]);

  if (!author)
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
              sx={{
                width: { xs: "300px", sm: "450px", lg: "800px" },
                height: "auto",
              }} // Adjust styles as needed
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

  return (
    <Stack
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
        {author?.name}
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
          src={urlFor(author.authorImage).url()}
          alt={author?.name}
        />
      </Box>

      <BlockContent
        blocks={author.bio}
        projectId="0kqagvby"
        dataset="production"
        serializers={customSerializers}
      />
    </Stack>
  );
}

export default About;
