import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import EmpDataInput from "./EmpDataInput";
import { useNavigate } from "react-router-dom";

const EmployeeDataInputForm = ({ initialData }) => {
  const employeeTextField = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "NIC Number", key: "nicNumber" },
    { label: "Email", key: "email" },
    { label: "Contact", key: "contact" },
    { label: "Designation", key: "designation" },
    { label: "Salary", key: "salary" },
  ];
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    nicNumber: "",
    email: "",
    contact: "",
    designation: "",
    salary: "",
    isEdit: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e, fieldKey) => {
    setFormData({ ...formData, [fieldKey]: e.target.value });
  };

  const handleValidation = () => {
    const errors = {};
    // Validation rules
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.nicNumber) errors.nicNumber = "NIC Number is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.contact) errors.contact = "Contact number is required";
    if (!formData.salary) errors.salary = "Salary is required";
    if (!formData.designation) errors.designation = "Designation is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (handleValidation()) {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      
      // If the employee is being edited, update the record, otherwise add a new one
      if (formData.isEdit) {
        const updatedEmployees = employees.map(emp => 
          emp.employeeId === formData.employeeId ? { ...formData, isEdit: false } : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      navigate("/"); 
      } else {
        const newEmployeeId = Date.now(); // Unique employee ID for a new employee
        const updatedFormData = { ...formData, employeeId: newEmployeeId };
        localStorage.setItem("employees", JSON.stringify([...employees, updatedFormData]));
      }
      setFormData({
        employeeId: "",
        firstName: "",
        lastName: "",
        nicNumber: "",
        email: "",
        contact: "",
        designation: "",
        salary: "",
        isEdit: false,
      });
        console.log(formData)

    }
  };

  return (
    <div className="InputForm">
      <h2>{formData.isEdit ? "Edit Employee" : "Add Employee"}</h2>
      <Grid container spacing={2}>
        {employeeTextField.map((field) => (
          <Grid item xs={12} sm={field.key === "firstName" || field.key === "lastName" ? 6 : 12} key={field.key}>
            <EmpDataInput
              field={field}
              formData={formData}
              handleInputChange={handleInputChange}
              formErrors={formErrors}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="success"
        onClick={handleSave}
      >
        { formData.isEdit ? "Update Employee" : "Add Employee" }
      </Button>
    </div>
  );
};
export default EmployeeDataInputForm;
