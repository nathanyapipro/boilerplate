import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

interface SubSidebarProps {}

type Props = SubSidebarProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 auto",
    width: theme.spacing(28)
  }
}));

function SubSidebarBase(props: Props) {
  const classes = useStyles();

  return <div className={classes.container}></div>;
}

const SubSidebar = SubSidebarBase;

export default SubSidebar;
