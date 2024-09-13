// TableRowActions.js
import React from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "50px", 
});

const TableRowActions = ({ employeeId, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const selectedEmployee = employees.find(emp => emp.employeeId === employeeId);
    if (selectedEmployee) {
        selectedEmployee.isEdit = true;
          const updatedEmployees = employees.map(emp =>
          emp.employeeId === employeeId ? selectedEmployee : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  
    navigate(`/inputForm/${employeeId}`);
  }};

  return (
    <ActionsContainer>
      <IconButton aria-label="edit" color="primary" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" color="secondary" onClick={() => onDelete(employeeId)}>
        <DeleteIcon />
      </IconButton>
    </ActionsContainer>
  );
};

export default TableRowActions;
