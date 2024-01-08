import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import img1 from "/src/images/Create-rafiki.png";
import { motion } from "framer-motion";
import { bouncy } from "ldrs";

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
    </>
  );
}

export default Home;
