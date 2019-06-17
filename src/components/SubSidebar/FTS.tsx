import * as React from "react";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core/styles";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import Header from "./Header";
import Link from "./Link";

interface OwnProps {}

type Props = OwnProps;

// const useStyles = makeStyles((_: Theme) => ({}));

function MTSBase(_: Props) {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Filling Tracker" />

      {/* <Link path="/mts/afm" label="AFM" icon={CropSquareIcon} /> */}
    </React.Fragment>
  );
}

const MTS = MTSBase;

export default MTS;
