import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { login } from "../../states/api/actions";
import * as Api from "../../services/api";
import { ApiCall, RequestStatus } from "../../states/api/reducer";
import { StoreState } from "../../states";
import { makeStyles } from "@material-ui/styles";
import { formatErrorMessage } from "../../helpers/api";
import { Theme } from "@material-ui/core";
import { getLocalStorageAuthUuid } from "../../helpers/auth";

interface ReduxStateProps {
  apiCall: ApiCall;
}

interface ReduxDispatchProps {
  login: (params: Api.ApiLoginParams) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(6)}px ${theme.spacing(8)}px`
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    width: "100%"
  },
  field: {
    marginBottom: theme.spacing(3)
  },
  button: {
    height: theme.spacing(6),
    marginTop: theme.spacing(4)
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
  },
  author: { alignSelf: "flex-start" }
}));

type Props = ReduxDispatchProps & ReduxStateProps;

function LoginBase(props: Props) {
  const { apiCall } = props;
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uuid = getLocalStorageAuthUuid();
    if (uuid) {
      props.login({ email, password, uuid });
    }
  };

  React.useEffect(() => {
    if (apiCall.status === RequestStatus.FAILURE) {
      setPassword("");
    }
  }, [setPassword, apiCall]);

  return (
    <Card className={classes.card}>
      <Typography variant="h4" gutterBottom={false}>
        Airgraft Operation System
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.author}
      >
        by Airgraft
      </Typography>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        {apiCall.status === RequestStatus.FAILURE && (
          <div className={classes.error}>
            <Typography color="inherit">
              {formatErrorMessage(apiCall.error)}
            </Typography>
          </div>
        )}
        <Typography variant="caption" color="textSecondary">
          Email
        </Typography>
        <TextField
          required
          id="email"
          className={classes.field}
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="none"
        />
        <Typography variant="caption" color="textSecondary">
          Password
        </Typography>
        <TextField
          required
          id="password"
          className={classes.field}
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          type="password"
          margin="none"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
          disabled={apiCall.status === RequestStatus.FETCHING}
        >
          Login
        </Button>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { login } = state.api;

  return {
    apiCall: login
  };
};

const Login = connect(
  mapStateToProps,
  {
    login
  }
)(LoginBase);

export default Login;
