import * as React from "react";
import { connect } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DeviceModel } from "../../types/models";
import * as dateHelper from "../../helpers/date";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { actions } from "../../states/crud/actions";
import { deleteDeviceModel } from "../../states/api/actions";
import { ApiDeleteDeviceModelParams } from "../../services/api";

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
  deviceModel: DeviceModel;
}

interface ReduxDispatchProps {
  setEditId: (params?: number) => void;
  deleteDeviceModel: (params: ApiDeleteDeviceModelParams) => void;
}

interface OwnProps {
  id: number;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const RowBase = function RowBase(props: Props) {
  const { id, deviceModel, setEditId, deleteDeviceModel } = props;

  const classes = useStyles();

  const handleEdit = () => {
    setEditId(id);
  };

  const handleDelete = () => {
    deleteDeviceModel({
      ids: [id]
    });
  };

  return (
    <TableRow className={classes.row}>
      <TableCell>{deviceModel.id}</TableCell>
      <TableCell>{deviceModel.colorNumber}</TableCell>
      <TableCell>{deviceModel.modelNumber}</TableCell>
      <TableCell>{deviceModel.hardwareRevision}</TableCell>
      <TableCell>
        <img
          height={80}
          width={80}
          src={deviceModel.imageUrl}
          alt="device-model"
        />
      </TableCell>
      <TableCell>{deviceModel.lastModifiedAdminId}</TableCell>
      <TableCell>{dateHelper.format(deviceModel.createdDate)}</TableCell>
      <TableCell>{dateHelper.format(deviceModel.modifiedDate)}</TableCell>
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
  const { byId } = state.cache.deviceModels;
  const { id } = ownProps;
  const deviceModel = byId[id];

  return {
    deviceModel
  };
};

const Row = React.memo(
  connect(
    mapStateToProps,
    {
      setEditId: actions.setEditId,
      deleteDeviceModel
    }
  )(RowBase)
);

export default Row;
