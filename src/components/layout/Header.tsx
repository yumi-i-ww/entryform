import { Box } from "@mui/material";
import corporate_logo from "../../assets/Tsubasa_logo.png";

export const Header = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid #ddd",
          gap: 2,
          height: 86,
          px: 2,
          backgroundColor: "#fff",
        }}
      >
        <a
          href="https://www.world-wing.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={corporate_logo} alt="corporate-logo" />
        </a>
      </Box>
    </Box>
  );
};
