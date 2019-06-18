import * as React from "react";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import grey from "@material-ui/core/colors/grey";

// const defaultTheme = createMuiTheme({});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FFF94F",
      main: "#FFC600",
      dark: "#C79600"
    },
    secondary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000"
    },
    background: {
      default: grey[100]
    }
  },
  typography: {
    fontSize: 14
  },
  overrides: {
    MuiTable: {
      root: {
        position: "relative",
        tableLayout: "fixed"
      }
    }
  }
});

interface WrappedComponentProps {}

function withTheme<P extends WrappedComponentProps>(
  Component: React.ComponentType<P>
) {
  function WithTheme(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithTheme;
}

export default withTheme;
