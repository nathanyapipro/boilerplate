import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import CategoryIcon from "@material-ui/icons/Category";
import ColorizeIcon from "@material-ui/icons/Colorize";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: theme.spacing(7)
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `${theme.spacing(4)}px 0px ${theme.spacing(3)}px 0px`
  },
  logo: {
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "row",
    height: theme.spacing(4),
    width: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px"
  },
  title: {
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "row",
    alignItems: "baseline",
    fontSize: "0.5rem",
    fontWeight: 600,
    position: "relative"
  },
  osText: {
    fontSize: "0.75rem",
    fontWeight: 600
  },
  underline: {
    position: "absolute",
    height: "1px",
    width: "100%",
    backgroundColor: theme.palette.text.primary,
    bottom: "0px"
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: theme.spacing(7),
    color: theme.palette.text.disabled,
    backgroundColor: "inherit",

    "&.active": {
      color: theme.palette.primary.main
    },

    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    },
    transition: theme.transitions.create(["backgroundColor", "color"], {
      duration: theme.transitions.duration.short
    })
  },
  icon: {
    fontSize: "1.6rem"
  },
  spacer: {
    display: "flex",
    flex: 1
  }
}));

function SidebarBase(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <Typography component="div" className={classes.title}>
            A<Typography className={classes.osText}>OS</Typography>
            <div className={classes.underline} />
          </Typography>
        </div>
      </div>
      <NavLink to="/cms" className={classes.link}>
        <WallpaperIcon className={classes.icon} />
      </NavLink>
      <NavLink to="/firmware" className={classes.link}>
        <DeveloperBoardIcon className={classes.icon} />
      </NavLink>
      <NavLink to="/mts" className={classes.link}>
        <CategoryIcon className={classes.icon} />
      </NavLink>
      <NavLink to="/fts" className={classes.link}>
        <ColorizeIcon className={classes.icon} />
      </NavLink>
      <div className={classes.spacer} />
      <NavLink to="/profiles" className={classes.link}>
        <SupervisedUserCircleIcon className={classes.icon} />
      </NavLink>
    </div>
  );
}

const Sidebar = SidebarBase;

export default Sidebar;
