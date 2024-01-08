import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import { grid } from "ldrs";

function LoadingComponent() {
  const [loading, setLoading] = useState(true);
  grid.register();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <Box
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          component={motion.div}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <l-grid size="60" speed="1.5" color="white"></l-grid>
        </Box>
      )}
    </AnimatePresence>
  );
}

export default LoadingComponent;
