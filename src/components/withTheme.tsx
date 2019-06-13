import * as React from "react";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({});

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
