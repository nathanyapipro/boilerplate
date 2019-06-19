import * as React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

type Props = {};

const Head = (_: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Version</TableCell>
        <TableCell>Model</TableCell>
        <TableCell colSpan={2}>Description</TableCell>
        <TableCell>Published At</TableCell>
        <TableCell>Modified At</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(Head);
