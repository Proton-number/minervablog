import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import { Card, CardCover, CardContent } from "@mui/joy";
import img1 from "/src/images/pexels-ksenia-chernaya-5716296.jpg";
import img2 from "/src/images/pexels-cottonbro-studio-4778407.jpg";
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
        <Box className="overlay" sx={{ height: "100vh", zIndex: 1 }} />
        <video autoPlay loop muted src={viddy} className="video-bg" />
        <Stack
          spacing={2}
          sx={{
            zIndex: 1,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            width: { sm: "60%", lg: "80%" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "50px", sm: "80px", lg: "100px" } }}
          >
            {" "}
            Connect with Mechanical Engineering Students
          </Typography>

          <Typography variant="h6">
            Join our community and share your experiences as an engineering
            student
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                padding: { sm: "0.5rem 1rem 0.5rem 1rem" },
                fontSize: { sm: "1.25rem" },
                "&:hover": {
                  backgroundColor: "hsl(225, 5%, 17%)",
                  color: "white",
                },
              }}
              disableElevation
            >
              Contact us
            </Button>
            <Button
              onClick={() => alert("yoo")}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "black",
                textTransform: "none",
                padding: { sm: "0.5rem 1rem 0.5rem 1rem" },
                color: "white",
                fontSize: { sm: "1.25rem" },
                "&:hover": {
                  borderColor: "pink",
                },
              }}
              disableElevation
            >
              Services we offer
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* INSPIRING BLOG STACK */}
      <Stack
        spacing={{ xs: 4, sm: 8, lg: 0 }}
        direction={{ sm: "row" }}
        sx={{
          padding: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "hsl(191, 67%, 5%)",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: { lg: "60%" },
            color: "hsl(27, 100%, 77%)",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "80px", lg: "110px" } }}
          >
            Inspiring Blogs
          </Typography>
          <Typography variant="h6" sx={{ width: { lg: "70%" } }}>
            Be a source of inspiration for other engineering students by sharing
            your journey and experiences. Our platform allows you to inspire and
            motivate others in the community.
          </Typography>
        </Stack>
        <Box
          component="img"
          src={img1}
          sx={{ width: { xs: "300px", lg: "500px" }, height: "auto" }}
        />
      </Stack>

      <Stack
        spacing={{ xs: 4, sm: 8, lg: 17 }}
        direction={{ sm: "row" }}
        sx={{
          padding: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "hsl(7, 69%, 97%)",
        }}
      >
        <Box
          component="img"
          src={img2}
          sx={{ width: { xs: "300px", lg: "500px" }, height: "auto" }}
        />
        <Stack
          spacing={2}
          sx={{
            width: { lg: "60%" },
            color: "hsl(20, 100%, 50%)",
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "80px", lg: "110px" } }}
          >
            Exclusive Resources
          </Typography>
          <Typography variant="h6" >
            Gain access to exclusive resources, tips, and tricks for excelling
            in your engineering studies. Our platform provides valuable
            resources and information to help you succeed.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default Home;

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
