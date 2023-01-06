import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import RemainingLeaves from "../components/RemainingLeaves";
import LeaveStatus from "../components/LeaveStatus";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  listRemainingLeaves,
  listLeaveStatus,
} from "../actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";


function LeaveScreen() {
  const [component, setComponent] = useState("remainingleaves");

  const secondComponent = () => {
    setComponent("leavestatus");
    console.log(component);
  };

  const firstComponent = () => {
    setComponent("remainingleaves");
    console.log(component);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const employeeRemainingLeaves = useSelector((state) => state.employeeRemainingLeaves);
  const employeeLeaveStatus = useSelector((state) => state.employeeLeaveStatus)



  useEffect(() => {
    if (component === "remainingleaves") {
      dispatch(listRemainingLeaves());
    } else {
      dispatch(listLeaveStatus());
    }
  }, [dispatch, component]);

  return (
    <Container>
      <Header />
      {component === "remainingleaves" ? (
        <RemainingLeaves employeeRemainingLeaves={employeeRemainingLeaves} />
      ) : (
        <LeaveStatus employeeLeaveStatus={employeeLeaveStatus} />
      )}
      <Container>
        <Row
          lg={12}
          md={6}
          className="justify-content-lg-center justify-content-md-center"
        >
          <Col lg={2} md={4} className="mt-4 offset-md-1">
            <Button
              variant="outline-dark"
              className="mt-2"
              onClick={firstComponent}
            >
              Remaining Leaves
            </Button>
          </Col>
          <Col lg={2} md={4} className="mt-4">
            <Button
              variant="outline-dark"
              className="mt-2"
              onClick={secondComponent}
            >
              Leave Status
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LeaveScreen;
