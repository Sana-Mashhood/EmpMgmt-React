import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

const TableHeader = ({ orderBy, sortDirection, handleSort, columnVisibility, columns }) => (
  <TableHead>
    <TableRow>
      {columns.map(({ id, label }) =>
        columnVisibility[id] || id === "actions" ? (
          <TableCell key={id}>
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? sortDirection : "asc"}
              onClick={() => handleSort(id)}
            >
              {label}
            </TableSortLabel>
          </TableCell>
        ) : null
      )}
    </TableRow>
  </TableHead>
);

export default TableHeader;
