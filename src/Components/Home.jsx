import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Card, CardCover, CardContent } from "@mui/joy";
import img1 from "/src/images/Create-rafiki.png";
import { motion } from "framer-motion";
import { bouncy } from "ldrs";
import viddy from "../Components/Videos/pexels-c-technical-6334253 (1080p).mp4";

function Home() {
  const [loading, isLoading] = useState(true);

  bouncy.register();

  const homeFont = createTheme({
    typography: {
      fontFamily: "Signika, sans-serif",
    },
  });

  useEffect(() => {
    setTimeout(() => isLoading(false), 2590);
  }, []);

  return (
    <>
      <Box className="hero">
        <Box className="overlay" sx={{ height: { lg: "103%" } }} />
        <video autoPlay loop muted src={viddy} className="video-bg" />
        <Box
          sx={{
            position: "absolute",
            top: 320,
            left: 0,
            right: 0,
            bottom:0,
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h1">Hey There!</Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;

{
  /* <>
      {loading ? (
        <l-bouncy size="45" speed="1.75" color="hsl(229, 100%, 23%)"></l-bouncy>
      ) : (
        <Stack sx={{ marginTop: { xs: "80px" } }}>
          <Stack
            spacing={{ lg: 40 }}
            direction={{ sm: "row" }}
            sx={{ alignItems: "center" }}
          >
            <Box
              component={motion.img}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              src={img1}
              sx={{
                width: { xs: "420px", sm: "420px", lg: "620px" },
                height: { xs: "auto", sm: "auto", lg: "auto" },
              }}
            />
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              sx={{
                backgroundColor: "hsl(212, 93%, 36%)",
                height: { xs: "240px", sm: "260px", lg: "300px" },
                width: { xs: "240px", sm: "280px", lg: "300px" },
                padding: "30px",
                borderRadius: "70% 25% 75% 25% / 67% 25% 25% 25%",
                position: "relative",
                zIndex: "3",
              }}
            >
              <ThemeProvider theme={homeFont}>
                <Typography
                  sx={{
                    position: "absolute",
                    top: { xs: "38%", sm: "40%" },
                    left: { xs: "14%", sm: "20%" },
                    transform: {
                      xs: '"translate(30%, 30%)"',
                      sm: "translate(10%, 10%)",
                    },
                    color: "white",
                  }}
                  variant="h4"
                  component={motion.h4}
                  initial={{ y: 40 }}
                  animate={{ y: 0, transition: { duration: 0.8, delay: 0.3 } }}
                  whileHover={{ scale: 1.1 }}
                >
                  Create. Connect. Inspire.
                </Typography>
              </ThemeProvider>
            </Box>
          </Stack>
        </Stack>
      )}
    </> */
}
