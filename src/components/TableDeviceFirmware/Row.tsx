import * as React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import {
  TableRow,
  TableCell,
  Theme,
  Typography,
  IconButton
} from "@material-ui/core";
import { Firmware } from "../../types/models";
import * as dateHelper from "../../helpers/date";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    cursor: "pointer",
    position: "relative"
  },
  versionCell: {
    color: theme.palette.primary.main,
    textDecoration: "underline"
  }
}));

interface ReduxStateProps {
  firmware: Firmware;
}

interface ReduxDispatchProps {}

interface OwnProps {
  id: number;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const RowBase = function RowBase(props: Props) {
  const { firmware } = props;

  const classes = useStyles();

  return (
    <TableRow className={classes.row} hover>
      <TableCell>{firmware.id}</TableCell>
      <TableCell>
        <a href={firmware.url} className={classes.versionCell}>
          {firmware.version}
        </a>
      </TableCell>
      <TableCell>{firmware.model}</TableCell>
      <TableCell colSpan={2}>{firmware.description}</TableCell>
      <TableCell>{dateHelper.format(firmware.publishedDate)}</TableCell>
      <TableCell>{dateHelper.format(firmware.modifiedDate)}</TableCell>
      <TableCell>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const mapStateToProps = (state: StoreState, ownProps: OwnProps) => {
  const { byId } = state.cache.firmwares;
  const { id } = ownProps;
  const firmware = byId[id];

  return {
    firmware
  };
};

const Row = React.memo(
  connect(
    mapStateToProps,
    {}
  )(RowBase)
);

export default Row;
