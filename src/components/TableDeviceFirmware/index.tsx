import * as React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
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
  ids: Array<number>;
  apiCall: ApiCall;
}

type Props = OwnProps & ReduxStateProps;

function TableDeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { ids, apiCall } = props;

  if (ids.length === 0 && apiCall.status === RequestStatus.SUCCESS) {
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
          ids.map(id => <Row key={id} id={id} />)
        )}
      </TableBody>
    </Table>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { ids } = state.crud;
  const apiCall = state.api.getFirmwares;

  return {
    ids,
    apiCall
  };
};

const TableDeviceFirmware = connect(mapStateToProps)(TableDeviceFirmwareBase);

export default TableDeviceFirmware;
