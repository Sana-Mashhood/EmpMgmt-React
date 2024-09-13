import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TableWrapper from "../components/TableWrapper";

const DisplayPage = () => {
  const navigate = useNavigate();

  const handleNavigationButton = () => {
    navigate("/inputForm");
  }
  return (
    <div>
      <Button variant="contained" onClick={handleNavigationButton}>Add New Employee</Button>
      <TableWrapper />
      
    </div>
  );
};

export default DisplayPage;
