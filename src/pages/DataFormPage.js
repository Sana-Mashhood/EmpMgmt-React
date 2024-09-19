// DataFormPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import EmployeeDataInputForm from '../components/EmployeeDataInputForm';
import NavBar from '../components/NavBar';

const DataFormPage = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (employeeId) {
      const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
      const employeeData = storedEmployees.find(emp => emp.employeeId === parseInt(employeeId, 10));
      setInitialData(employeeData || {});
    }
  }, [employeeId]);

  const handleNavigate = () => {
    navigate('/displayData');
  };

  return (
    <div className='InputFormWrapper'>
      <NavBar/>
      <EmployeeDataInputForm initialData={initialData} />
    </div>
  );
};

export default DataFormPage;
