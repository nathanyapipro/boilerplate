import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    "&:focus": {
      outlineColor: theme.palette.primary.main
    }
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
  thumb: {
    display: "inline-flex",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(12),
    height: theme.spacing(12),
    padding: theme.spacing(0.5)
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden"
  },
  image: {
    display: "block",
    width: "auto",
    height: "100%"
  }
}));

interface OwnProps {
  value?: File;
  onChange: (file?: File) => void;
}

type Props = OwnProps;

function ImageDropzone(props: Props) {
  const classes = useStyles();
  const { value, onChange } = props;

  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);
    onChange(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop
  });

  const renderDropZone = () => {
    return (
      <div className={classes.dropzone}>
        {isDragActive ? (
          <Typography color="textSecondary">Drop the image here ...</Typography>
        ) : (
          <Typography color="textSecondary">
            Drag 'n' drop some image here, or click to select image
          </Typography>
        )}
      </div>
    );
  };

  const renderPreview = () => {
    if (!value) {
      return <noscript />;
    }
    return (
      <div className={classes.preview}>
        <div className={classes.thumb}>
          <div className={classes.thumbInner}>
            <img src={URL.createObjectURL(value)} className={classes.image} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div {...getRootProps()} className={classes.container}>
      <input {...getInputProps()} />
      {value ? renderPreview() : renderDropZone()}
    </div>
  );
}

export default ImageDropzone;
