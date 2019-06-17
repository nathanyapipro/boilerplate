import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface OwnProps {
  title: string;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: "flex",
    height: theme.spacing(12),
    alignItems: "center",
    padding: `0px ${theme.spacing(2)}px`
  },
  title: {
    fontWeight: 600
  }
}));

function HeaderBase(props: Props) {
  const classes = useStyles();

  const { title } = props;

  return (
    <div className={classes.header}>
      <Typography variant="body1" color="textPrimary" className={classes.title}>
        {title}
      </Typography>
    </div>
  );
}

const Header = HeaderBase;

export default Header;
