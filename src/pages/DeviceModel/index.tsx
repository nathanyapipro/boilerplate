import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { getDeviceModels } from "../../states/api/actions";
import TableDeviceModel from "../../components/TableDeviceModel";
import { ApiGetDeviceModelsParams } from "../../services/api";
import { actions } from "../../states/crud/actions";
import Page from "../../layouts/AppLayout/Page";
import { getPaginationQuery, PaginationQuery } from "../../helpers/queryString";
import { push } from "connected-react-router";
import * as queryString from "query-string";
import { RouteComponentProps } from "react-router";
import DeviceModelUpdateModal from "../../modals/DeviceModelUpdate";
import DeviceModelCreateModal from "../../modals/DeviceModelCreate";

interface ReduxStateProps {}

interface ReduxDispatchProps {
  getDeviceModels: (params: ApiGetDeviceModelsParams) => void;
  reset: (params: void) => void;
  push: typeof push;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    flex: 1
  }
}));

type Props = ReduxDispatchProps & ReduxStateProps & RouteComponentProps;

function DeviceModelBase(props: Props) {
  const classes = useStyles();

  const { reset, getDeviceModels, location, push } = props;

  const query = React.useMemo(() => getPaginationQuery(location.search), [
    location.search
  ]);

  React.useEffect(() => {
    getDeviceModels(query);
    return () => {
      reset();
    };
  }, [query, getDeviceModels, reset]);

  const handleQueryChange = (query: PaginationQuery) => {
    // @ts-ignore
    const serializedQuery = queryString.stringify(query);
    push(`/cms/device?${serializedQuery}`);
  };

  const handlePageChange = (params: PaginationQuery) => {
    handleQueryChange(params);
  };

  return (
    <React.Fragment>
      <Page
        header={
          <React.Fragment>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.title}
            >
              Device Models
            </Typography>
          </React.Fragment>
        }
        content={<TableDeviceModel onPageChange={handlePageChange} />}
      />
      <DeviceModelUpdateModal />
      <DeviceModelCreateModal />
    </React.Fragment>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const DeviceModel = connect(
  mapStateToProps,
  {
    reset: actions.reset,
    getDeviceModels,
    push
  }
)(DeviceModelBase);

export default DeviceModel;
