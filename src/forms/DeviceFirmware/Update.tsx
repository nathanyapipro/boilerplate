import * as React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
// import Loading from "../../components/Loading";
import { ApiCall, RequestStatus } from "../../states/api/reducer";
import { Theme } from "@material-ui/core";
import { actions } from "../../states/fms/actions";
import { Firmware } from "../../types/models";
import { formatErrorMessage } from "../../helpers/api";

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
  },
  error: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.error.dark,
    fontWeight: "bolder"
  }
}));

interface OwnProps {}

interface ReduxStateProps {
  id?: number;
  apiCall: ApiCall;
  data?: Firmware;
}

interface ReduxDispatchProps {
  setPutId: (params?: number) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function UpdateDialogBase(props: Props) {
  const classes = useStyles();
  const { id, data, setPutId, apiCall } = props;

  const handleClose = () => {
    setPutId(undefined);
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={Boolean(id)}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {data && (
        <React.Fragment>
          <DialogTitle id="form-dialog-title">{`Updade Device Firmware ${data.id}`}</DialogTitle>
          <DialogContent>
            <form
              autoComplete="off"
              className={classes.form}
              onSubmit={console.log}
            >
              {apiCall.status === RequestStatus.FAILURE && (
                <div className={classes.error}>
                  <Typography color="inherit">
                    {formatErrorMessage(apiCall.error)}
                  </Typography>
                </div>
              )}
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
            <Button onClick={handleClose} color="default">
              Cancel
            </Button>
            <Button onClick={console.log} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { putId: id } = state.fms.device;
  const apiCall = state.api.getFirmwares;
  const { byId } = state.cache.firmwares;
  let data = undefined;
  if (id) {
    data = byId[id];
  }
  return {
    id,
    apiCall,
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
