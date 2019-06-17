import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Sidebar from "./Sidebar";
import SubSidebar from "./SubSidebar";

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "row"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "8px 0px 12px 0px",
    backgroundColor: theme.palette.grey[50],
    flex: 1,
    padding: theme.spacing(3)
  }
}));

function AppLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Sidebar />
      <SubSidebar />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default AppLayout;
