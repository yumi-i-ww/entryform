import React from "react";

import { Box, Typography } from "@mui/material";

export const Footer = () => {
	return (
		
			<Box
			sx={
				{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: 50,
					borderTop: "1px solid #ddd",
				}
			}>

			<Typography>Copyright © 2024 Tsubasa co., Ltd.</Typography>
			</Box>
		
	);
};
