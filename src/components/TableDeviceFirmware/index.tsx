import * as React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import Head from "./Head";
import Row from "./Row";
import Loading from "../../components/Loading";
import { ApiCall, RequestStatus } from "../../states/api/reducer";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  tableBody: {
    position: "relative"
  },
  empty: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginBottom: theme.spacing(2)
  },
  title: {
    flex: 1,
    fontWeight: 600
  },
  icon: {
    marginRight: theme.spacing(0.5)
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

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.title}
        >
          All Device Firmwares
        </Typography>
        <Button color="primary" size="small" variant="contained">
          <AddIcon className={classes.icon} fontSize="small" />
          Create
        </Button>
      </div>
      <Table className={classes.table}>
        <Head />
        <TableBody className={classes.tableBody}>
          {ids.length === 0 && apiCall.status === RequestStatus.SUCCESS ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className={classes.empty}
                >
                  No Device Firmwares found
                </Typography>
              </TableCell>
            </TableRow>
          ) : apiCall.status === RequestStatus.FETCHING ? (
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
    </React.Fragment>
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
