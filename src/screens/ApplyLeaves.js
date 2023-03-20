import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Col, Container, Row, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeLeaveApply,listRemainingLeaves  } from "../actions/employeeActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ApplyLeaves() {
  const navigate = useNavigate();
  const RemainingLeaves = useSelector((state) => state.employeeRemainingLeaves)
  const { employeeremainingleaves } = RemainingLeaves

  const leaves_array = ["casual_leave","sick_leave","emergency_leave","comp_off","optional_holidays"]
 

  useEffect(()=>{
    dispatch(listRemainingLeaves())
    },[])

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const [leaveDate, setLeaveDate] = useState("");
  const [EndleaveDate, setEndleaveDate] = useState("");
  const [leaveType, setLeaveType] = useState("1");
  const [halfday, setHalfday] = useState(false);
  const [leaveNotes, setLeaveNotes] = useState("");
  const [noofleaves, setNoOfLeave] = useState(1);
  const [leaveapplied, setLeaveApplyStatus] = useState(false);
  const [errormsg,setErrormsg]=useState("")
  const dispatch = useDispatch();
  const applyLeaveStatus = useSelector((state) => state.employeeLeaveApply);
  const { loading, error, employeeleaveapplied } = applyLeaveStatus;
  const submitHandler = (event) => {
    event.preventDefault();
    if(Object.keys(employeeremainingleaves).filter((ele)=> ele === leaves_array[parseInt(leaveType)-1]).map((el)=>employeeremainingleaves[el] === 0)[0]===true){
      setErrormsg(`you don't have ${leaves_array[parseInt(leaveType)-1].replace("_"," ")}`)
    }
    else {
      dispatch(
        EmployeeLeaveApply(
          leaveType,
          leaveNotes,
          leaveDate,
          EndleaveDate,
          noofleaves,
          halfday
        )
      );
      setLeaveDate("");
      setEndleaveDate("");
      setLeaveType("");
      setLeaveNotes("");
      setNoOfLeave(1);
      setHalfday(false);
      setErrormsg("")
    }
  };
  
  setTimeout(()=>{
    if(leaveapplied===true){
      setLeaveApplyStatus(false)
      window.location.reload()
    }
  },2000)
  useEffect(() => {
    if (employeeleaveapplied && employeeleaveapplied.status === 200) {
      setLeaveApplyStatus(true);
    }
  }, [leaveapplied,employeeleaveapplied]);
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
            <div class="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter the date"
                  value={leaveDate}
                  max={EndleaveDate}
                  onChange={(event) => {
                    setLeaveDate(event.target.value);
                  }}
                  onInvalid={e => e.target.setCustomValidity("Please Fill out this Field")}
                  onInput={F => F.target.setCustomValidity('')} 
                 required
                />
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter the date"
                  value={EndleaveDate}
                  min={leaveDate}
                  onChange={(e) => {
                    setEndleaveDate(e.target.value);
                  }}
                  onInvalid={e => e.target.setCustomValidity("Please Fill out this Field")}
                 onInput={F => F.target.setCustomValidity('')} 
                required
                />
              </Form.Group>
            </div>
            <div class="row">
              <Form.Group className="mb-3 col-md-6">
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
                 <p style={{color:"red",fontSize:"14px",marginTop:"10px"}} class="text-capitalize">{errormsg}</p>
              </Form.Group>
              <Form.Group className="mb-3 col-md-6">
                <br />
                {leaveDate === EndleaveDate &&
                (leaveType === "1" || leaveType === "2") ? (
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
              </Form.Group>
            </div>
            <Form.Group controlId="formNumber" className="mt-3">
              <Form.Label>No Of Leaves</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={noofleaves}
                onChange={(e) => setNoOfLeave(e.target.value)}
              />
            </Form.Group>
            <div style={{ width: "450px" }}>
              <label htmlFor="specialrequesttextarea" className="mt-4">
                Reason
              </label>
              <textarea
                className="form-control mt-3"
                id="exampleFormControlTextarea1"
                rows="6"
                cols={20}
                value={leaveNotes}
                onChange={(e) => {
                  setLeaveNotes(e.target.value);
                }}
                 onInvalid={e => e.target.setCustomValidity("Please Fill out this Field")}
                 onInput={F => F.target.setCustomValidity('')} 
                required
              />
            </div>
            <div style={{ marginLeft: "80px" }}>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 offset-lg-3"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ApplyLeaves;
