import * as React from "react";
// import { makeStyles } from "@material-ui/styles";
// import { Theme } from "@material-ui/core/styles";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import Header from "./Header";
import Link from "./Link";

interface OwnProps {}

type Props = OwnProps;

// const useStyles = makeStyles((_: Theme) => ({}));

function ProfilesBase(_: Props) {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Header title="Profiles" />

      <Link
        path="/profiles/afm-manufacturer"
        label="AFM Manufacturers"
        icon={CropSquareIcon}
      />
      <Link
        path="/profiles/device-manufacturer"
        label="Device Manufacturers"
        icon={CropSquareIcon}
      />
      <Link
        path="/profiles/pod-manufacturer"
        label="Pod Manufacturers"
        icon={CropSquareIcon}
      />
      <Link path="/profiles/brands" label="Brands" icon={CropSquareIcon} />
      <Link
        path="/profiles/distilleries"
        label="Distilleries"
        icon={CropSquareIcon}
      />
      <Link path="/profiles/users" label="Users" icon={CropSquareIcon} />
    </React.Fragment>
  );
}

const Profiles = ProfilesBase;

export default Profiles;
