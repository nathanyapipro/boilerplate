import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    margin: `${theme.spacing(4)}px ${theme.spacing(8)}px`,
    borderBottom: `2px solid ${theme.palette.primary.main}`
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(1)}px ${theme.spacing(8)}px ${theme.spacing(
      4
    )}px ${theme.spacing(8)}px`
  }
}));

function Page(props: Props) {
  const { header, content } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
    </div>
  );
}

export default Page;
