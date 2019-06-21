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
import DeviceModelAutocomplete, {
  DeviceModelAutocompleteValue
} from "../../components/Autocomplete/DeviceModel";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%"
  },
  field: {
    display: "flex",
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

function FormBase(props: Props) {
  const classes = useStyles();
  const { handleClose, initialData, apiCall, putFirmware } = props;

  const requestStatus = apiCall.status;
  const previousRequestStatus = usePrevious<RequestStatus>(apiCall.status);

  const [values, setValues] = React.useState({
    version: initialData.version,
    models: initialData.models,
    description: initialData.description
  });

  const [errors, setErrors] = React.useState({
    version: undefined,
    models: undefined,
    description: undefined
  });

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      version: value
    });
  };

  const handleModelsChange = (value: DeviceModelAutocompleteValue) => {
    setValues({
      ...values,
      models: value ? (value instanceof Array ? value : [value]) : []
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
    if (!values.models || values.models.length === 0) {
      errors.models = "Required";
    }
    setErrors(errors);
  }, [values]);

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">{`Updade Device Firmware ${initialData.id}`}</DialogTitle>
      <DialogContent dividers>
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
          Models
        </Typography>
        <div className={classes.field}>
          <DeviceModelAutocomplete
            error={errors.models}
            value={values.models}
            onChange={handleModelsChange}
          />
        </div>
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
    </React.Fragment>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const apiCall = state.api.putFirmware;

  return {
    apiCall
  };
};

const Form = connect(
  mapStateToProps,
  {
    putFirmware
  }
)(FormBase);

export default Form;
