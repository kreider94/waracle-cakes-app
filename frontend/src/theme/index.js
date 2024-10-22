import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#17d7a5",
    },
    secondary: {
      main: "#df7c2d",
    },
  },
  typography: {
    fontFamily: "Arial",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;