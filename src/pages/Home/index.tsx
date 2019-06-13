import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface ReduxStateProps {}

interface ReduxDispatchProps {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

type Props = ReduxDispatchProps & ReduxStateProps;

function HomeBase(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom={false}>
        HOME
      </Typography>
    </div>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const Home = connect(
  mapStateToProps,
  {}
)(HomeBase);

export default Home;
