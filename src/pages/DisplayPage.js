import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import TableWrapper from "../components/TableWrapper";
import NavBar from "../components/NavBar";

const DisplayPage = () => {
  const navigate = useNavigate();

  const handleNavigationButton = () => {
    navigate("/inputForm");
  };
  return (
    <div className="home">
      <NavBar/>

      <TableWrapper />
    </div>
  );
};

export default DisplayPage;
