import * as React from "react";
import { connect } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Firmware } from "../../types/models";
import * as dateHelper from "../../helpers/date";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { actions } from "../../states/fms/actions";
import { deleteFirmware } from "../../states/api/actions";
import { ApiDeleteFirmwareParams } from "../../services/api";

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    position: "relative",
    cursor: "default"
  },
  versionCell: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    color: theme.palette.primary.main,
    textDecoration: "underline",
    cursor: "pointer"
  }
}));

interface ReduxStateProps {
  firmware: Firmware;
}

interface ReduxDispatchProps {
  setPutId: (params?: number) => void;
  deleteFirmware: (params: ApiDeleteFirmwareParams) => void;
}

interface OwnProps {
  id: number;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const RowBase = function RowBase(props: Props) {
  const { id, firmware, setPutId, deleteFirmware } = props;

  const classes = useStyles();

  const handleEdit = () => {
    setPutId(id);
  };

  const handleDelete = () => {
    deleteFirmware({
      ids: [id]
    });
  };

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
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
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
    {
      setPutId: actions.setPutId,
      deleteFirmware
    }
  )(RowBase)
);

export default Row;
