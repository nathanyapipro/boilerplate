import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import CMSSubSidebar from "../../components/SubSidebar/CMS";
import FMSSubSidebar from "../../components/SubSidebar/FMS";
import MTSSubSidebar from "../../components/SubSidebar/MTS";
import FTSSubSidebar from "../../components/SubSidebar/FTS";
import ProfilesSubSidebar from "../../components/SubSidebar/Profiles";

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
        return (
          <div className={classes.container}>
            <CMSSubSidebar />
          </div>
        );
      }
      case "fms": {
        return (
          <div className={classes.container}>
            <FMSSubSidebar />
          </div>
        );
      }
      case "mts": {
        return (
          <div className={classes.container}>
            <MTSSubSidebar />
          </div>
        );
      }
      case "fts": {
        return (
          <div className={classes.container}>
            <FTSSubSidebar />
          </div>
        );
      }
      case "profiles": {
        return (
          <div className={classes.container}>
            <ProfilesSubSidebar />
          </div>
        );
      }

      default: {
        return <noscript />;
      }
    }
  };

  return <React.Fragment>{renderSubSiderbar()}</React.Fragment>;
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
