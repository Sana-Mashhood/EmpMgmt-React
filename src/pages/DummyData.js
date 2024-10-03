import React from "react";
import NavBar from "../components/NavBar";
import { Col, Row } from "antd";

const DummyData = () => {
  return (
    <div  >
      <NavBar />
      <div className="Grid">
        <Row style={{width: '100%'}}>
          <Col span={24} style={{backgroundColor: "white"}}>col</Col>
        </Row>
        <Row style={{width: '100%'}}>
          <Col span={12} style={{backgroundColor: "grey"}}>col-12</Col>
          <Col span={12} style={{backgroundColor: "white"}}>col-12</Col>
        </Row>
        <Row style={{width: '100%'}}>
          <Col span={8} style={{backgroundColor: "white"}}>col-8</Col>
          <Col span={8} style={{backgroundColor: "grey"}}>col-8</Col>
          <Col span={8} style={{backgroundColor: "white"}}>col-8</Col>
        </Row>
        <Row style={{width: '100%'}}>
          <Col span={6} style={{backgroundColor: "grey"}}>col-6</Col>
          <Col span={6} style={{backgroundColor: "white"}}>col-6</Col>
          <Col span={6} style={{backgroundColor: "grey"}}>col-6</Col>
          <Col span={6} style={{backgroundColor: "white"}}>col-6</Col>
        </Row>
      </div>
    </div>
  );
};

export default DummyData;
