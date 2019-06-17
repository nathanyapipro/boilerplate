import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getFirmwares } from "../../states/api/actions";
import TableDeviceFirmware from "../../components/TableDeviceFirmware";
import UpdateDeviceFirmwareDialog from "../../forms/DeviceFirmware/Update";

interface ReduxStateProps {}

interface ReduxDispatchProps {
  getFirmwares: (params: void) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    height: theme.spacing(12),
    alignItems: "center"
  },
  title: {
    fontWeight: 600,
    flex: 1
  },
  icon: {
    marginRight: theme.spacing(0.5)
  },
  content: {
    display: "flex"
  }
}));

type Props = ReduxDispatchProps & ReduxStateProps;

function DeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { getFirmwares } = props;

  React.useEffect(() => {
    getFirmwares();
  }, [getFirmwares]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" color="textPrimary" className={classes.title}>
          Device Firmware
        </Typography>
        <Button color="primary" size="small" variant="contained">
          <AddIcon className={classes.icon} fontSize="small" />
          Create
        </Button>
      </div>
      <div className={classes.content}>
        <TableDeviceFirmware />
      </div>
      <UpdateDeviceFirmwareDialog />
    </div>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const DeviceFirmware = connect(
  mapStateToProps,
  {
    getFirmwares
  }
)(DeviceFirmwareBase);

export default DeviceFirmware;
