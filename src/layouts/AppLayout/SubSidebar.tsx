import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import CMSSubSidebar from "../../components/SubSidebar/CMS";

interface OwnProps {}

interface ReduxStateProps {
  pathname: string;
}

interface ReduxDispatchProps {}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: theme.spacing(24)
  }
}));

function SubSidebarBase(props: Props) {
  const classes = useStyles();

  const { pathname } = props;
  const section = pathname.split("/")[1];

  const renderSubSiderbar = () => {
    switch (section) {
      case "cms": {
        return <CMSSubSidebar />;
      }
      default: {
        return <noscript />;
      }
    }
  };

  return <div className={classes.container}>{renderSubSiderbar()}</div>;
}

const mapStateToProps = (state: StoreState) => {
  return {
    pathname: state.router.location.pathname
  };
};

const SubSidebar = connect(
  mapStateToProps,
  {}
)(SubSidebarBase);

export default SubSidebar;
