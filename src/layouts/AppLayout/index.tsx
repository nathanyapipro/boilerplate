import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

interface AppLayoutProps {
  children: React.ReactNode;
}

type Props = AppLayoutProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "row"
  },
  sidebar: {
    display: "flex",
    flexDirection: "row",
    borderRight: `1px solid ${theme.palette.divider}`,
    flex: "0 0 auto",
    // backgroundColor: theme.palette.common.white,
    width: theme.spacing(9)
  },
  content: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.common.white,
    flex: 1,
    padding: theme.spacing(3)
  }
}));

function AppLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}></div>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default AppLayout;
