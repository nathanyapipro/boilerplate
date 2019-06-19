import * as React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { StoreState } from "../../states";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
import { actions } from "../../states/fms/actions";
import { Firmware } from "../../types/models";
import Form from "./Form";

// const useStyles = makeStyles((theme: Theme) => ({}));

interface OwnProps {}

interface ReduxStateProps {
  data?: Firmware;
}

interface ReduxDispatchProps {
  setPutId: (params?: number) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function UpdateDialogBase(props: Props) {
  // const classes = useStyles();
  const { data, setPutId } = props;

  const handleClose = () => {
    setPutId(undefined);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={Boolean(data)}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      scroll="paper"
    >
      {data && <Form handleClose={handleClose} initialData={data} />}
    </Dialog>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { putId } = state.fms.device;
  const { byId } = state.cache.firmwares;
  let data = undefined;
  if (putId) {
    data = byId[putId];
  }
  return {
    data
  };
};

const UpdateDialog = connect(
  mapStateToProps,
  {
    setPutId: actions.setPutId
  }
)(UpdateDialogBase);

export default UpdateDialog;
