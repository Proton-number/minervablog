import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import img1 from "/src/images/pexels-ksenia-chernaya-5716296.jpg";
import img2 from "/src/images/pexels-cottonbro-studio-4778407.jpg";
import { motion } from "framer-motion";
import viddy from "../Components/Videos/pexels-c-technical-6334253 (1080p).mp4";
import Loader from "./Loader";

function Home({ mode }) {
  const [loading, isLoading] = useState(true);

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
      {loading ? (
        <>
          <Loader mode={mode} />
        </>
      ) : (
        <>
          <Box className="hero">
            <Box className="overlay" sx={{ height: "100vh", zIndex: 1 }} />
            <video autoPlay loop muted src={viddy} className="video-bg" />
            <Stack
              spacing={{ sm: 4 }}
              sx={{
                zIndex: 1,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                display: "flex",
                width: { xs: "90%", sm: "80%", lg: "70%" },
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "60px", sm: "50px", lg: "100px" },
                  fontWeight: { sm: 700 },
                  lineHeight: 1,
                }}
              >
                {" "}
                Connect with Mechanical Engineering Students
              </Typography>

              <Typography variant="body1">
                Join our community and share your experiences as an engineering
                student
              </Typography>
            </Stack>
          </Box>

          {/* INSPIRING BLOG STACK */}
          <Stack
            spacing={{ xs: 4, sm: 8, lg: 0 }}
            direction={{ xs: "column-reverse", sm: "row" }}
            sx={{
              padding: { xs: "20px", sm: "", lg: "100px" },
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
                sx={{ fontSize: { xs: "66px", sm: "78px", lg: "110px" } }}
              >
                Inspiring Blogs
              </Typography>
              <Typography
                variant="body1"
                sx={{ width: { sm: "80%", lg: "70%" } }}
              >
                Be a source of inspiration for other engineering students by
                sharing your journey and experiences. Our platform allows you to
                inspire and motivate others in the community.
              </Typography>
            </Stack>
            <Box
              component="img"
              src={img1}
              sx={{
                width: { xs: "220px", sm: "400px", lg: "500px" },
                height: { sm: "380px", lg: "auto" },
              }}
            />
          </Stack>

          <Stack
            spacing={{ xs: 4, sm: 8, lg: 17 }}
            direction={{ sm: "row" }}
            sx={{
              padding: { xs: "20px", lg: "100px" },
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
              sx={{
                width: { xs: "220px", sm: "400px", lg: "500px" },
                height: { sm: "380px", lg: "auto" },
              }}
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
                sx={{ fontSize: { xs: "66px", sm: "78px", lg: "110px" } }}
              >
                Exclusive Resources
              </Typography>
              <Typography variant="body1">
                Gain access to exclusive resources, tips, and tricks for
                excelling in your engineering studies. Our platform provides
                valuable resources and information to help you succeed.
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
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
