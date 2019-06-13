import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

interface SidebarProps {}

type Props = SidebarProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 auto",
    width: theme.spacing(9)
  }
}));

function SidebarBase(props: Props) {
  const classes = useStyles();

  return <div className={classes.container}></div>;
}

const Sidebar = SidebarBase;

export default Sidebar;
