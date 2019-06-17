import * as React from "react";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core/styles";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import Header from "./Header";
import Link from "./Link";

interface OwnProps {}

type Props = OwnProps;

// const useStyles = makeStyles((_: Theme) => ({}));

function FirmwareBase(_: Props) {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Content Manager" />

      <Link path="/firmware/devices" label="Devices" icon={CropSquareIcon} />
    </React.Fragment>
  );
}

const Firmware = FirmwareBase;

export default Firmware;
