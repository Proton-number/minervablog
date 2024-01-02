import React from "react";
import {
  Typography,
  Stack,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import img1 from "/src/images/Create-rafiki.png";
import { motion } from "framer-motion";

function Home() {
  const homeFont = createTheme({
    typography: {
      fontFamily: "Signika, sans-serif",
    },
  });
  return (
    <Stack>
      <Stack
        spacing={{ lg: 40 }}
        direction={{ sm: "row" }}
        sx={{ alignItems: "center" }}
      >
        <Box
          component={motion.img}
          src={img1}
          sx={{
            width: { sm: "420px", lg: "600px" },
            height: { sm: "400px", lg: "600px" },
          }}
        />
        <Box
          sx={{
            backgroundColor: "hsl(212, 93%, 36%)",
            height: { sm: "260px", lg: "300px" },
            width: { sm: "280px", lg: "300px" },
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
                top: "40%",
                left: "20%",
                transform: "translate(10%, 10%)",
                color: "white",
              }}
              variant="h4"
              component={motion.h4}
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create. Connect. Inspire.
            </Typography>
          </ThemeProvider>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Home;
