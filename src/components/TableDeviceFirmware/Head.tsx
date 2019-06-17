import * as React from "react";
import { TableHead, TableRow, TableCell, Typography } from "@material-ui/core";

type Props = {};

const Head = (_: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            ID
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            VERSION
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            MODEL
          </Typography>
        </TableCell>
        <TableCell colSpan={2}>
          <Typography color="textSecondary" variant="caption">
            DESC
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            PUBLISHED AT
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            MODEFIED AT
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="caption">
            ACTIONS
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default React.memo(Head);
