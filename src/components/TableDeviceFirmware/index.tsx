import * as React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
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
import { Pagination } from "../../types/models";
import { PaginationQuery } from "../../helpers/queryString";
import { actions } from "../../states/crud/actions";

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
    alignItems: "center",
    flex: 1
  },
  title: {
    flex: 1,
    fontWeight: 600
  },
  createButton: {
    marginLeft: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(0.5)
  }
}));

interface OwnProps {
  onPageChange: (params: PaginationQuery) => void;
}

interface ReduxStateProps {
  ids: Array<number>;
  apiCall: ApiCall;
  pagination?: Pagination;
}

interface ReduxDispatchProps {
  setIsCreating: (params: boolean) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function TableDeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { ids, apiCall, pagination, onPageChange, setIsCreating } = props;

  const { total = 0, pageNum = 0, pageSize = 0 } = pagination || {};

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    onPageChange({
      page: page + 1,
      size: pageSize
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.title}
        >
          All Device Firmwares
        </Typography>
        <TablePagination
          component="div"
          count={total}
          onChangePage={handlePageChange}
          page={pageNum - 1}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[]}
        />
        <Button
          color="primary"
          variant="contained"
          className={classes.createButton}
          onClick={handleCreate}
        >
          <AddIcon className={classes.icon} fontSize="small" />
          Create
        </Button>
      </div>
      <Table className={classes.table}>
        <Head />
        <TableBody className={classes.tableBody}>
          {ids.length === 0 && apiCall.status === RequestStatus.SUCCESS ? (
            <TableRow>
              <TableCell colSpan={9}>
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
              <TableCell colSpan={9}>
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
  const { ids, pagination } = state.crud;
  const apiCall = state.api.getFirmwares;

  return {
    ids,
    apiCall,
    pagination
  };
};

const TableDeviceFirmware = connect(
  mapStateToProps,
  { setIsCreating: actions.setIsCreating }
)(TableDeviceFirmwareBase);

export default TableDeviceFirmware;
