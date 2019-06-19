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
            Version
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Model
          </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography color="textSecondary" variant="caption">
            Description
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Published At
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            Modefied At
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
