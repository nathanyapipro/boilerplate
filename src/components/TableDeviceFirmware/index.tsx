import * as React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import Head from "./Head";
import Row from "./Row";
import Loading from "../../components/Loading";
import { ApiCall, RequestStatus } from "../../states/api/reducer";

const useStyles = makeStyles(() => ({
  table: {},
  tableBody: {
    position: "relative"
  }
}));

interface OwnProps {}

interface ReduxStateProps {
  firwareIds: Array<number>;
  apiCall: ApiCall;
}

type Props = OwnProps & ReduxStateProps;

function TableDeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { firwareIds, apiCall } = props;

  if (firwareIds.length === 0 && apiCall.status === RequestStatus.SUCCESS) {
    return (
      <Table className={classes.table}>
        <Head />
        <TableBody className={classes.tableBody}>
          <TableRow>
            <TableCell colSpan={8}>
              <Typography>No Device Firmwares found.</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table className={classes.table}>
      <Head />
      <TableBody className={classes.tableBody}>
        {apiCall.status === RequestStatus.FETCHING ? (
          <TableRow>
            <TableCell colSpan={8}>
              <Loading />
            </TableCell>
          </TableRow>
        ) : (
          firwareIds.map(id => <Row key={id} id={id} />)
        )}
      </TableBody>
    </Table>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { allIds: firwareIds } = state.cache.firmwares;
  const apiCall = state.api.getFirmwares;

  return {
    firwareIds,
    apiCall
  };
};

const TableDeviceFirmware = connect(mapStateToProps)(TableDeviceFirmwareBase);

export default TableDeviceFirmware;
