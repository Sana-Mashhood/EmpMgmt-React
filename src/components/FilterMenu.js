import React from "react";
import { Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";

const FilterMenu = ({ anchorEl, onClose, columnVisibility, onColumnVisibilityChange, columns }) => (
  <Menu
    id="filter-menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    {columns.map(({ id, label }) => (
      <MenuItem key={id}>
        <Checkbox
          checked={columnVisibility[id]}
          onChange={() => onColumnVisibilityChange(id)}
        />
        <ListItemText primary={label} />
      </MenuItem>
    ))}
  </Menu>
);

export default FilterMenu;
