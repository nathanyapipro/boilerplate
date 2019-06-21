import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { getFirmwares } from "../../states/api/actions";
import TableDeviceFirmware from "../../components/TableDeviceFirmware";
import { ApiGetFirmwaresParams } from "../../services/api";
import { actions } from "../../states/crud/actions";
import Page from "../../layouts/AppLayout/Page";
import { getPaginationQuery, PaginationQuery } from "../../helpers/queryString";
import { push } from "connected-react-router";
import * as queryString from "query-string";
import { RouteComponentProps } from "react-router";
import DeviceFirmwareCreateModal from "../../modals/DeviceFirmwareCreate";
import DeviceFirmwareUpdateModal from "../../modals/DeviceFirmwareUpdate";

interface ReduxStateProps {}

interface ReduxDispatchProps {
  getFirmwares: (params: ApiGetFirmwaresParams) => void;
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

function DeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { reset, getFirmwares, location, push } = props;

  const query = React.useMemo(() => getPaginationQuery(location.search), [
    location.search
  ]);

  React.useEffect(() => {
    getFirmwares(query);
    return () => {
      reset();
    };
  }, [query, getFirmwares, reset]);

  const handleQueryChange = (query: PaginationQuery) => {
    // @ts-ignore
    const serializedQuery = queryString.stringify(query);
    push(`/fms/device?${serializedQuery}`);
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
              Device Firmwares
            </Typography>
          </React.Fragment>
        }
        content={<TableDeviceFirmware onPageChange={handlePageChange} />}
      />
      <DeviceFirmwareCreateModal />
      <DeviceFirmwareUpdateModal />
    </React.Fragment>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const DeviceFirmware = connect(
  mapStateToProps,
  {
    reset: actions.reset,
    getFirmwares,
    push
  }
)(DeviceFirmwareBase);

export default DeviceFirmware;
