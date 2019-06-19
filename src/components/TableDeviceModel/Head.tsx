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
        <TableCell>Color Number</TableCell>
        <TableCell>Model Number</TableCell>
        <TableCell>Hardware Revision</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Last Modified By</TableCell>
        <TableCell>Created At</TableCell>
        <TableCell>Modified At</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(Head);
