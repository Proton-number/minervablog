import React from "react";
import { bouncy } from "ldrs";
import { Box } from "@mui/material";

function Loader({ mode }) {
  bouncy.register();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: mode ? "white": "hsl(0, 0%, 15%)"  ,
      }}
    >
      <l-bouncy
        size="45"
        speed="1.75"
        color={!mode ? "white" : "black"}
      ></l-bouncy>
    </Box>
  );
}

export default Loader;
