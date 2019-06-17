import * as React from "react";
import { connect } from "react-redux";
import { Table, TableBody } from "@material-ui/core";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import Head from "./Head";
import Row from "./Row";

const useStyles = makeStyles(() => ({
  table: {
    position: "relative",
    tableLayout: "fixed"
  },
  tableBody: {
    position: "relative"
  }
}));

interface OwnProps {}

interface ReduxStateProps {
  firwareIds: Array<number>;
}

type Props = OwnProps & ReduxStateProps;

function TableDeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { firwareIds } = props;

  return (
    <Table className={classes.table}>
      <Head />
      <TableBody className={classes.tableBody}>
        {firwareIds.map(id => (
          <Row key={id} id={id} />
        ))}
      </TableBody>
    </Table>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { allIds: firwareIds } = state.cache.firmwares;

  return {
    firwareIds
  };
};

const TableDeviceFirmware = connect(mapStateToProps)(TableDeviceFirmwareBase);

export default TableDeviceFirmware;
