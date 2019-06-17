import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CropSquareIcon from "@material-ui/icons/CropSquare";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    height: theme.spacing(10),
    alignItems: "center",
    padding: `0px ${theme.spacing(2)}px`
  },
  title: {
    padding: theme.spacing(1),
    fontWeight: 600
  },
  link: {
    display: "flex",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,

    "&.active": {
      "&> $linkItem": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary
      }
    },

    "&:hover": {
      "&> $linkItem": {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary
      }
    }
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(["backgroundColor"], {
      duration: theme.transitions.duration.short
    })
  },
  linkIcon: {
    marginRight: theme.spacing(1)
  },
  linkText: {
    fontWeight: 600
  }
}));

function SidebarBase(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.title}
        >
          Content Manager
        </Typography>
      </div>
      <NavLink to="/cms/devices" className={classes.link}>
        <div className={classes.linkItem}>
          <CropSquareIcon fontSize="small" className={classes.linkIcon} />
          <Typography className={classes.linkText} variant="body2">
            Devices
          </Typography>
        </div>
      </NavLink>
      <NavLink to="/cms/pods" className={classes.link}>
        <div className={classes.linkItem}>
          <CropSquareIcon fontSize="small" className={classes.linkIcon} />
          <Typography className={classes.linkText} variant="body2">
            Pods
          </Typography>
        </div>
      </NavLink>
      <NavLink to="/cms/oils" className={classes.link}>
        <div className={classes.linkItem}>
          <CropSquareIcon fontSize="small" className={classes.linkIcon} />
          <Typography className={classes.linkText} variant="body2">
            Oils
          </Typography>
        </div>
      </NavLink>
      <NavLink to="/cms/farms" className={classes.link}>
        <div className={classes.linkItem}>
          <CropSquareIcon fontSize="small" className={classes.linkIcon} />
          <Typography className={classes.linkText} variant="body2">
            Farms
          </Typography>
        </div>
      </NavLink>
      <NavLink to="/cms/Labs" className={classes.link}>
        <div className={classes.linkItem}>
          <CropSquareIcon fontSize="small" className={classes.linkIcon} />
          <Typography className={classes.linkText} variant="body2">
            Labs
          </Typography>
        </div>
      </NavLink>
    </div>
  );
}

const Sidebar = SidebarBase;

export default Sidebar;
