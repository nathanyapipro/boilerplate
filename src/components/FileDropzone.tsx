import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    outline: "unset",
    border: "1px solid transparent",
    borderRadius: theme.shape.borderRadius,
    "&:focus": {
      outline: "unset",
      borderWidth: 2,
      borderColor: theme.palette.primary.main
    },
    cursor: "pointer"
  },
  error: {
    borderColor: `${theme.palette.error.main} !important`
  },
  dropzone: {
    display: "flex",
    flex: 1,
    padding: theme.spacing(3),
    borderWidth: 2,
    borderRadius: theme.shape.borderRadius,
    borderStyle: "dashed",
    borderColor: theme.palette.divider,
    alignItems: "center",
    justifyContent: "center"
  },
  preview: {
    display: "flex",
    flexDirection: "row"
  },
  file: {
    display: "block",
    width: "auto",
    height: "100%",
    padding: theme.spacing(1)
  }
}));

interface OwnProps {
  error: boolean;
  value?: string;
  onChange: (file?: File) => void;
}

type Props = OwnProps;

function FileDropzone(props: Props) {
  const classes = useStyles();
  const { error, value, onChange } = props;

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop
  });

  const renderDropZone = () => {
    return (
      <div className={classes.dropzone}>
        <Typography color="textSecondary" variant="body2">
          Drag and drop a file to upload
        </Typography>
      </div>
    );
  };

  const renderPreview = () => {
    if (!value) {
      return <noscript />;
    }
    return (
      <div className={classes.preview}>
        <Typography className={classes.file}>{value}</Typography>
      </div>
    );
  };

  return (
    <div
      {...getRootProps()}
      className={classNames(classes.container, { [classes.error]: error })}
    >
      <input {...getInputProps()} />
      {value ? renderPreview() : renderDropZone()}
    </div>
  );
}

export default FileDropzone;
