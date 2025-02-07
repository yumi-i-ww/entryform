import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#374C98",
		},
		secondary: {
			main: "#8CCAF2",
		},
		background: { default: "white" },
		error: {
			main: red.A400,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					color: "#ffffff",
					borderRadius: 20,
				},
			},
		},
	},
});
