import * as React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { StoreState } from "../../states";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
import { actions } from "../../states/crud/actions";
import { DeviceModel } from "../../types/models";
import Form from "./Form";

// const useStyles = makeStyles((theme: Theme) => ({}));

interface OwnProps {}

interface ReduxStateProps {
  data?: DeviceModel;
}

interface ReduxDispatchProps {
  setEditId: (params?: number) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function UpdateDialogBase(props: Props) {
  // const classes = useStyles();
  const { data, setEditId } = props;

  const handleClose = () => {
    setEditId(undefined);
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
  const { editId } = state.crud;

  const { byId } = state.cache.deviceModels;
  let data = undefined;
  if (editId) {
    data = byId[editId];
  }
  return {
    data
  };
};

const UpdateDialog = connect(
  mapStateToProps,
  {
    setEditId: actions.setEditId
  }
)(UpdateDialogBase);

export default UpdateDialog;
