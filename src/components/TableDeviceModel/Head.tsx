import * as React from "react";
import TableHead from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

type Props = {};

const Head = (_: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Id
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Color Number
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Model Number
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Hardware Revision
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Image
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Last Modified By
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Created At
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Modified At
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Actions
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(Head);
