import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Col, Container, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeLeaveApply } from "../actions/employeeActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ApplyLeaves() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const [leaveDate, setLeaveDate] = useState("");
  const [leaveType, setLeaveType] = useState("1");
  const [halfday, setHalfday] = useState(false);
  const [leaveNotes, setLeaveNotes] = useState("");
  const [noofleaves, setNoOfLeave] = useState(1);
  const [leaveapplied, setLeaveApplyStatus] = useState(false);
  const dispatch = useDispatch();
  const applyLeaveStatus = useSelector((state) => state.employeeLeaveApply);
  const { loading, error, employeeleaveapplied } = applyLeaveStatus;
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      EmployeeLeaveApply(leaveDate, leaveType, leaveNotes, noofleaves, halfday)
    );

    setLeaveDate("");
    setLeaveType("");
    setLeaveNotes("");
    setNoOfLeave(1);
    setHalfday(false);
  };

  useEffect(() => {
    if (employeeleaveapplied && employeeleaveapplied.status === 200) {
      setLeaveApplyStatus(true);
    }
  }, [leaveapplied, employeeleaveapplied]);
  return (
    <Container>
      <Header />
      <Row
        md={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="3" md="3" className="offset-lg-1 mt-2">
          <h2>Apply Leave</h2>
        </Col>
      </Row>
      <Row
        md={12}
        lg={12}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="auto" md="auto">
          {leaveapplied && leaveapplied === true ? (
            <Alert variant="success">Leave Applied Successfully</Alert>
          ) : null}
          {loading && <Loader />}
          {error && <Message variant="danger">Leave Submission Failed</Message>}
          <Form className="mt-4 p-4" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the date"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
              />
            </Form.Group>

            <Form.Label>Type Of Leave</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="1">Casual Leave</option>
              <option value="2">Sick Leave</option>
              <option value="3">Emergency Leave</option>
              <option value="4">Comp OFF</option>
              <option value="5">Optional Holiday</option>
            </Form.Select>
            {(leaveType && leaveType == "1") ||
            (leaveType && leaveType == "2") ? (
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Half Day"
                className="mt-3"
                checked={halfday}
                onChange={(e) => setHalfday(e.target.checked)}
              />
            ) : (
              <Form.Check
                disabled
                type="switch"
                id="custom-switch"
                label="Half Day"
                className="mt-3"
                checked={halfday}
                onChange={(e) => setHalfday(e.target.checked)}
              />
            )}
            <Form.Group controlId="formNumber" className="mt-3">
              <Form.Label>No Of Leaves</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={noofleaves}
                onChange={(e) => setNoOfLeave(e.target.value)}
              />
            </Form.Group>
            <label htmlFor="specialrequesttextarea" className="mt-4">
              Reason
            </label>
            <textarea
              className="form-control mt-3"
              id="exampleFormControlTextarea1"
              rows="6"
              value={leaveNotes}
              onChange={(e) => setLeaveNotes(e.target.value)}
            />
            {leaveDate && leaveType && leaveNotes && noofleaves ? (
              <Button
                variant="primary"
                type="submit"
                className="mt-4 offset-lg-3"
              >
                Submit
              </Button>
            ) : (
              <Button
                disabled
                variant="primary"
                type="submit"
                className="mt-4 offset-lg-3"
              >
                Submit
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplyLeaves;
