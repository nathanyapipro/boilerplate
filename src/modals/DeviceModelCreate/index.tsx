import * as React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import { StoreState } from "../../states";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core";
import { actions } from "../../states/crud/actions";
import Form from "./Form";

// const useStyles = makeStyles((theme: Theme) => ({}));

interface OwnProps {}

interface ReduxStateProps {
  open: boolean;
}

interface ReduxDispatchProps {
  setIsCreating: (params: boolean) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function CreateDialogBase(props: Props) {
  // const classes = useStyles();
  const { open, setIsCreating } = props;

  const handleClose = () => {
    setIsCreating(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      scroll="paper"
    >
      {open && <Form handleClose={handleClose} />}
    </Dialog>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { isCreating } = state.crud;

  return {
    open: isCreating
  };
};

const CreateDialog = connect(
  mapStateToProps,
  {
    setIsCreating: actions.setIsCreating
  }
)(CreateDialogBase);

export default CreateDialog;
