import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

interface ReduxStateProps {}

interface ReduxDispatchProps {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`
  }
}));

type Props = ReduxDispatchProps & ReduxStateProps;

function HomeBase(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h4" gutterBottom={false}>
          HOME
        </Typography>
      </Card>
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
