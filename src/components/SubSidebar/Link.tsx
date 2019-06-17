import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

interface OwnProps {
  path: string;
  icon: React.ComponentType<SvgIconProps>;
  label: string;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: "0 1 auto",
    minWidth: 0,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,

    "&.active": {
      "&> $content": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary
      }
    },

    "&:hover": {
      "&> $content": {
        backgroundColor: theme.palette.action.hover
      }
    }
  },
  content: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto",
    minWidth: 0,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    color: theme.palette.text.disabled,
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

function LinkBase(props: Props) {
  const classes = useStyles();

  const { path, label, icon: Icon } = props;

  return (
    <NavLink to={path} className={classes.container}>
      <div className={classes.content}>
        <Icon fontSize="small" className={classes.linkIcon} />
        <Typography className={classes.linkText} variant="body2" noWrap>
          {label}
        </Typography>
      </div>
    </NavLink>
  );
}

const Link = LinkBase;

export default Link;
