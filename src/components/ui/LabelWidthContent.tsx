import type React from "react";

import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

interface LabelWidthContentProps {
  label: string;
  content: React.ReactElement;
  isDirectionRow?: boolean;
}

export function LabelWidthContent(
  props: LabelWidthContentProps
): React.ReactElement {
  const { label, content, isDirectionRow = false } = props;

  return (
    <Box display={"flex"} flexDirection={isDirectionRow ? "row" : "column"}>
      <Typography minWidth={200} textAlign={"left"}>
        {label}
      </Typography>
      <Box width={"100%"}>{content}</Box>
    </Box>
  );
}
