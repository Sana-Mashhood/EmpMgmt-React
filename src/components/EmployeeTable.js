import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";
import TableRowActions from "./TableRowActions";
import TableHeader from "./TableHeader";
import FilterMenu from "./FilterMenu";

const columns = [
  { id: "employeeId", label: "Employee ID" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "nicNumber", label: "NIC Number" },
  { id: "email", label: "Email" },
  { id: "contact", label: "Contact" },
  { id: "designation", label: "Designation" },
  { id: "salary", label: "Salary" },
  { id: "actions", label: "Actions" },
];

const EmployeeTable = () => {
  const [rows, setRows] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("employeeId");
  const [filter, setFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState(
    columns.reduce((acc, { id }) => ({ ...acc, [id]: true }), {})
  );

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setRows(storedEmployees);
  }, []);

  const handleSort = (property) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
  const handleFilterClose = () => setAnchorEl(null);
  const handleColumnVisibilityChange = (column) =>
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));

  const handleEdit = (employeeId) =>
    console.log("Edit employee with ID:", employeeId);
  
  const handleDelete = (employeeId) => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedEmployees = storedEmployees.filter(employee => employee.employeeId !== employeeId);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  
    setRows(updatedEmployees);
  
    console.log("Deleted employee with ID:", employeeId);
  };
  
  const getComparator = (order, orderBy) => (a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedRows = filteredRows.sort(getComparator(sortDirection, orderBy));

  return (
    <div>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleFilterClick}
      >
        <FilterListIcon />
      </IconButton>
      <FilterMenu
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        columns={columns}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHeader
            orderBy={orderBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            columnVisibility={columnVisibility}
            columns={columns}
          />
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.employeeId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map(({ id }) =>
                  columnVisibility[id] ? (
                    <TableCell
                      key={id}
                      align={id === "salary" ? "right" : "left"}
                    >
                      {id === "actions" ? (
                        <TableRowActions
                          employeeId={row.employeeId}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ) : (
                        row[id]
                      )}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeTable;
