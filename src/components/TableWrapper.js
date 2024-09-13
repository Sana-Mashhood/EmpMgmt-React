import React from "react";
import EmployeeTable from "../components/EmployeeTable";

const TableWrapper = () => {
  return (
    <div className="wrapper">
      <div className="table-container">
        <EmployeeTable />
      </div>
    </div>
  );
};

export default TableWrapper;
