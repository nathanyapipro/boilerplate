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
import UpdateDeviceFirmwareModal from "../../modals/DeviceFirmwareUpdate";
import { ApiGetFirmwaresParams } from "../../services/api";
import { actions } from "../../states/crud/actions";
import Page from "../../layouts/AppLayout/Page";
import Header from "../../components/SubSidebar/Header";

interface ReduxStateProps {}

interface ReduxDispatchProps {
  getFirmwares: (params: ApiGetFirmwaresParams) => void;
  reset: (params: void) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    flex: 1
  },
  icon: {
    marginRight: theme.spacing(0.5)
  }
}));

type Props = ReduxDispatchProps & ReduxStateProps;

function DeviceFirmwareBase(props: Props) {
  const classes = useStyles();

  const { reset, getFirmwares } = props;

  React.useEffect(() => {
    getFirmwares({ page: 1, size: 10 });
    return () => {
      reset();
    };
  }, [getFirmwares, reset]);

  return (
    <Page
      header={
        <React.Fragment>
          <Typography
            variant="h6"
            color="textPrimary"
            className={classes.title}
          >
            Device Firmware
          </Typography>
          <Button color="primary" size="small" variant="contained">
            <AddIcon className={classes.icon} fontSize="small" />
            Create
          </Button>
        </React.Fragment>
      }
      content={<TableDeviceFirmware />}
    />
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const DeviceFirmware = connect(
  mapStateToProps,
  {
    reset: actions.reset,
    getFirmwares
  }
)(DeviceFirmwareBase);

export default DeviceFirmware;
