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
import { formatErrorMessage } from "../../helpers/api";
import { postDeviceModel } from "../../states/api/actions";
import {
  ApiPostDeviceModelParams,
  ApiPostFileImageParams
} from "../../services/api";
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
  handleClose: () => void;
}

interface ReduxStateProps {
  apiCall: ApiCall;
}

interface ReduxDispatchProps {
  postDeviceModel: (
    params: ApiPostDeviceModelParams & ApiPostFileImageParams
  ) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

type FormValues = {
  modelNumber?: string;
  hardwareRevision?: string;
  colorNumber?: string;
  file?: File;
};

function FormBase(props: Props) {
  const classes = useStyles();
  const { handleClose, apiCall, postDeviceModel } = props;

  const requestStatus = apiCall.status;
  const previousRequestStatus = usePrevious<RequestStatus>(apiCall.status);

  const [values, setValues] = React.useState<FormValues>({
    modelNumber: undefined,
    hardwareRevision: undefined,
    colorNumber: undefined,
    file: undefined
  });

  const [errors, setErrors] = React.useState({
    modelNumber: undefined,
    hardwareRevision: undefined,
    colorNumber: undefined,
    file: undefined
  });

  const handleModelNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      modelNumber: value
    });
  };

  const handleHardwareRevisionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setValues({
      ...values,
      hardwareRevision: value
    });
  };

  const handleColorNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValues({
      ...values,
      colorNumber: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = e.target;
    // setValues({
    //   ...values,
    //   file: value
    // });
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
    if (!hasErrors) {
      const params = {
        ...values
      } as ApiPostDeviceModelParams & ApiPostFileImageParams;
      postDeviceModel(params);
    }
  };

  React.useEffect(() => {
    const errors: any = {};
    if (!values.modelNumber) {
      errors.modelNumber = "Required";
    }
    if (!values.hardwareRevision) {
      errors.hardwareRevision = "Required";
    }
    if (!values.colorNumber) {
      errors.colorNumber = "Required";
    }
    setErrors(errors);
  }, [values]);

  const hasErrors = Object.keys(errors).length !== 0;

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">{`Create Device Model`}</DialogTitle>
      <DialogContent dividers>
        {apiCall.status === RequestStatus.FAILURE && (
          <div className={classes.error}>
            <Typography color="inherit">
              {formatErrorMessage(apiCall.error)}
            </Typography>
          </div>
        )}
        <Typography variant="caption" color="textSecondary">
          Model Number
        </Typography>
        <TextField
          className={classes.field}
          margin="dense"
          variant="outlined"
          value={values.modelNumber}
          error={Boolean(errors.modelNumber)}
          onChange={handleModelNumberChange}
          type="text"
          fullWidth
        />
        <Typography variant="caption" color="textSecondary">
          Hardware Revision
        </Typography>
        <TextField
          className={classes.field}
          margin="dense"
          variant="outlined"
          value={values.hardwareRevision}
          error={Boolean(errors.hardwareRevision)}
          onChange={handleHardwareRevisionChange}
          type="text"
          fullWidth
        />
        <Typography variant="caption" color="textSecondary">
          Color Number
        </Typography>
        <TextField
          className={classes.field}
          margin="dense"
          variant="outlined"
          value={values.colorNumber}
          error={Boolean(errors.colorNumber)}
          onChange={handleColorNumberChange}
          type="text"
          fullWidth
        />
        <Typography variant="caption" color="textSecondary">
          Image
        </Typography>
        <TextField
          className={classes.field}
          margin="dense"
          variant="outlined"
          value={values.file}
          error={Boolean(errors.file)}
          onChange={handleFileChange}
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={hasErrors || requestStatus === RequestStatus.FETCHING}
        >
          Create
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const apiCall = state.api.postDeviceModel;

  return {
    apiCall
  };
};

const Form = connect(
  mapStateToProps,
  {
    postDeviceModel
  }
)(FormBase);

export default Form;
