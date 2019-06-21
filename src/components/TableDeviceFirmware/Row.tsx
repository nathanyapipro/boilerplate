import * as React from "react";
import { connect } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Theme, Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Firmware, DeviceModel } from "../../types/models";
import { ById } from "../../types";
import * as dateHelper from "../../helpers/date";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { actions } from "../../states/crud/actions";
import { deleteFirmware } from "../../states/api/actions";
import { ApiDeleteFirmwareParams } from "../../services/api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { formatDeviceModel } from "../../helpers/deviceModel";
import { returnStatement } from "@babel/types";

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
  deviceModelsById: ById<DeviceModel>;
}

interface ReduxDispatchProps {
  setEditId: (params?: number) => void;
  deleteFirmware: (params: ApiDeleteFirmwareParams) => void;
}

interface OwnProps {
  id: number;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const RowBase = function RowBase(props: Props) {
  const { id, firmware, setEditId, deleteFirmware, deviceModelsById } = props;

  const classes = useStyles();

  const handleEdit = () => {
    setEditId(id);
  };

  const handleDelete = () => {
    deleteFirmware({
      ids: [id]
    });
  };

  const renderDeviceModels = () => {
    return firmware.models.map(deviceModelId => {
      const deviceModel = deviceModelsById[deviceModelId];
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="image" src={deviceModel.imageUrl} />
          </ListItemAvatar>
          <ListItemText>{formatDeviceModel(deviceModel)}</ListItemText>
        </ListItem>
      );
    });
  };

  return (
    <TableRow className={classes.row}>
      <TableCell>{firmware.id}</TableCell>
      <TableCell>
        <a href={firmware.url} className={classes.versionCell}>
          {firmware.version}
        </a>
      </TableCell>
      <TableCell colSpan={2}>
        <List>{renderDeviceModels()}</List>
      </TableCell>
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
    firmware,
    deviceModelsById: state.cache.deviceModels.byId
  };
};

const Row = React.memo(
  connect(
    mapStateToProps,
    {
      setEditId: actions.setEditId,
      deleteFirmware
    }
  )(RowBase)
);

export default Row;
