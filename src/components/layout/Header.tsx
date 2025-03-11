import React from "react";

import { Box, Typography } from "@mui/material";

import corporate_logo from "~/assets/Tsubasa_logo.png";

export const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "2px solid #ddd",
        gap: 2,
        height: 86,
        px: 2,
      }}
    >
      <a href="https://www.world-wing.com/">
        <img src={corporate_logo} alt="corporate-logo" />
      </a>
      <Typography>エントリーページ</Typography>
    </Box>
  );
};
