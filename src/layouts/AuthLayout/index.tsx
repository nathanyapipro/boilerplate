import * as React from "react";
import { makeStyles } from "@material-ui/styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

type Props = AuthLayoutProps;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

function AuthLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default AuthLayout;
