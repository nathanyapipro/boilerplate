import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { connect } from "react-redux";
import { StoreState } from "../states";
import { actions } from "../states/snackbar/actions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export interface SnackbarMessage {
  message: string;
  variant: SnackbarVariant;
  link?: {
    text: string;
    path: string;
  };
}

export type SnackbarVariant = "primary" | "error";

type KeyedSnackbarMessage = SnackbarMessage & {
  id: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2
  },
  messageContent: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary
  },
  messageIcon: {
    marginRight: theme.spacing(2)
  }
}));

interface ReduxStateProps {
  queue: Array<SnackbarMessage>;
}

interface ReduxDispatchProps {
  snackbarQueueItemProcessed: () => void;
}

type Props = ReduxStateProps & ReduxDispatchProps;

function SnackbarQueueBase(props: Props) {
  const { queue, snackbarQueueItemProcessed } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<
    KeyedSnackbarMessage | undefined
  >(undefined);

  const handleClose = React.useCallback(() => setOpen(false), []);
  const handleExited = () => snackbarQueueItemProcessed();

  React.useEffect(() => {
    const processQueue = () => {
      if (queue.length > 0) {
        setSnackbarMessage({ ...queue[0], id: new Date().getTime() });
        setOpen(true);
      }
    };

    open ? setOpen(false) : processQueue();
    // eslint-disable-next-line
  }, [queue]);

  if (!snackbarMessage) {
    return <noscript />;
  }

  const renderIcon = (snackbarMessage: SnackbarMessage) => {
    switch (snackbarMessage.variant) {
      case "primary":
        return (
          <CheckCircleOutlineIcon
            color="primary"
            className={classes.messageIcon}
          />
        );
      case "error":
        return (
          <ErrorOutlineIcon color="error" className={classes.messageIcon} />
        );
      // no default
    }
  };

  return (
    <Snackbar
      key={snackbarMessage.id}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={6000}
      onExited={handleExited}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
    >
      <SnackbarContent
        className={classes.message}
        message={
          snackbarMessage && (
            <span className={classes.messageContent}>
              {renderIcon(snackbarMessage)}
              {snackbarMessage.message}
            </span>
          )
        }
        action={
          snackbarMessage.link && (
            <Link to={snackbarMessage.link.path}>
              <Button color="primary">{snackbarMessage.link.text}</Button>
            </Link>
          )
        }
      />
    </Snackbar>
  );
}

const mapStateToProps = (state: StoreState) => {
  return {
    queue: state.snackbar
  };
};

const SnackbarQueue = connect(
  mapStateToProps,
  {
    snackbarQueueItemProcessed: actions.snackbarQueueItemProcessed
  }
)(SnackbarQueueBase);

export default SnackbarQueue;
