import * as React from "react";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core/styles";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import Header from "./Header";
import Link from "./Link";

interface OwnProps {}

type Props = OwnProps;

// const useStyles = makeStyles((_: Theme) => ({}));

function CMSBase(_: Props) {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Content Manager" />

      <Link path="/cms/devices" label="Devices" icon={CropSquareIcon} />
      <Link path="/cms/pods" label="Pods" icon={CropSquareIcon} />
      <Link path="/cms/oils" label="Oils" icon={CropSquareIcon} />
      <Link path="/cms/farmers" label="Farmers" icon={CropSquareIcon} />
    </React.Fragment>
  );
}

const CMS = CMSBase;

export default CMS;
