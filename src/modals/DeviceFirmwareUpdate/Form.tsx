import * as React from "react";
import { connect } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { ApiCall, RequestStatus } from "../../states/api/reducer";
import { Theme } from "@material-ui/core";
import { Firmware } from "../../types/models";
import { formatErrorMessage } from "../../helpers/api";
import { putFirmware } from "../../states/api/actions";
import { HasId } from "../../types";
import { ApiPutFirmwareParams } from "../../services/api";
import usePrevious from "../../hooks/usePrevious";

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

interface OwnProps {
  initialData: Firmware;
  handleClose: () => void;
}

interface ReduxStateProps {
  apiCall: ApiCall;
}

interface ReduxDispatchProps {
  putFirmware: (params: HasId & ApiPutFirmwareParams) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function UpdateDialogBase(props: Props) {
  const classes = useStyles();
  const { handleClose, initialData, apiCall, putFirmware } = props;

  const requestStatus = apiCall.status;
  const previousRequestStatus = usePrevious<RequestStatus>(apiCall.status);

  const [values, setValues] = React.useState({
    version: initialData.version,
    model: initialData.model,
    description: initialData.description
  });

  const [errors, setErrors] = React.useState({
    version: undefined,
    model: undefined,
    description: undefined
  });

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      version: value
    });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      model: value
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      description: value
    });
  };

  React.useEffect(() => {
    if (
      previousRequestStatus === RequestStatus.FETCHING &&
      requestStatus === RequestStatus.SUCCESS
    ) {
      handleClose();
    }
  }, [previousRequestStatus, requestStatus, handleClose]);

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      putFirmware({
        id: initialData.id,
        publishedDate: initialData.publishedDate,
        ...values
      });
    }
  };

  React.useEffect(() => {
    const errors: any = {};
    if (!values.version) {
      errors.version = "Required";
    }
    if (!values.model) {
      errors.model = "Required";
    }
    setErrors(errors);
  }, [values]);

  return (
    <form autoComplete="off" className={classes.form}>
      <DialogTitle id="form-dialog-title">{`Updade Device Firmware ${initialData.id}`}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogContent>
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
          value={values.version}
          error={Boolean(errors.version)}
          onChange={handleVersionChange}
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
          value={values.model}
          error={Boolean(errors.model)}
          onChange={handleModelChange}
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
          value={values.description}
          onChange={handleDescriptionChange}
          type="text"
          fullWidth
        />
        <Typography variant="caption" color="textSecondary">
          Url
        </Typography>
        <Typography
          className={classes.field}
          variant="body1"
          color="textPrimary"
        >
          {initialData.url}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={requestStatus === RequestStatus.FETCHING}
        >
          Update
        </Button>
      </DialogActions>
    </form>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const apiCall = state.api.putFirmware;

  return {
    apiCall
  };
};

const UpdateDialog = connect(
  mapStateToProps,
  {
    putFirmware
  }
)(UpdateDialogBase);

export default UpdateDialog;
