import * as React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import Loading from "../../components/Loading";
import { ApiCall, RequestStatus } from "../../states/api/reducer";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%"
  },
  field: {
    marginTop: 0,
    marginBottom: theme.spacing(1)
  }
}));

interface OwnProps {}

interface ReduxStateProps {
  selectedId?: number;
  apiCall: ApiCall;
}

type Props = OwnProps & ReduxStateProps;

function UpdateDialogBase(props: Props) {
  const classes = useStyles();

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={true}
      onClose={console.log}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Updade Device Firmware 1</DialogTitle>
      <DialogContent>
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={console.log}
        >
          {/* {apiCall.status === RequestStatus.FAILURE ? (
            <div className={classes.error}>
              <Typography color="inherit">
                {formatErrorMessage(apiCall.error)}
              </Typography>
            </div>
          ) : (
            undefined
          )} */}
          <Typography variant="caption" color="textSecondary">
            Version
          </Typography>
          <TextField
            className={classes.field}
            margin="dense"
            variant="outlined"
            id="version"
            type="text"
            fullWidth
          />
          <Typography variant="caption" color="textSecondary">
            Model
          </Typography>
          <TextField
            className={classes.field}
            margin="dense"
            variant="outlined"
            type="text"
            fullWidth
          />
          <Typography variant="caption" color="textSecondary">
            Description
          </Typography>
          <TextField
            className={classes.field}
            multiline
            rows="4"
            margin="dense"
            variant="outlined"
            id="description"
            type="text"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={console.log} color="default">
          Cancel
        </Button>
        <Button onClick={console.log} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { selectedId } = state.fms.device;
  const apiCall = state.api.getFirmwares;

  return {
    selectedId,
    apiCall
  };
};

const UpdateDialog = connect(mapStateToProps)(UpdateDialogBase);

export default UpdateDialog;
