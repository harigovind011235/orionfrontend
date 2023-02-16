import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import ReactPaginate from "react-paginate";
import { listEmployeeLeaves } from "../actions/adminActions";
import {
  getEmployeeLeaveResults,
  updateEmployeeLeave,
} from "../actions/adminActions";


function AdminLeaveTable() {
  let [page, setPage] = useState(1);
  const [employeeleavelist, setEmployeeLeaveList] = useState([]);

  const dispatch = useDispatch();
  const employeeLeaveList = useSelector((state) => state.employeeLeaveList);
  const { error, loading, employeependingleaves } = employeeLeaveList;
  const employee_leaves_array =
    employeependingleaves && employeependingleaves["data"]
      ? employeependingleaves["data"]
      : null;
  const totalLeaveCount = employee_leaves_array
    ? employee_leaves_array.length
    : null;

  if (
    employee_leaves_array &&
    totalLeaveCount &&
    employeeleavelist.length < totalLeaveCount
  ) {
    employeeleavelist.push(...employee_leaves_array);
  }

  const totalPage = Math.ceil(parseInt(totalLeaveCount) / 20);

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  useEffect(() => {
    setEmployeeLeaveList([]);
    dispatch(listEmployeeLeaves(page));
  }, [dispatch, page]);

  const [leaveType, setLeaveType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  const handleLeaveStatus = (event) => {
    setLeaveStatus(event.target.value);
  };

  const handleSearchText = (event) => {
    setEmployeeName(event.target.value);
  };
  const handleSearch = () => {
    dispatch(getEmployeeLeaveResults(leaveType, leaveStatus, employeeName));
  };

  const [leaveSelectedStatus, setLeaveSelectedStatus] = useState("");
  const leaveUpdated = useSelector((state) => state.updatedEmployeeLeave);
  const { updatedleave } = leaveUpdated;
  const handleSelectedLeaveStatus = (event, leaveid) => {
    const selectedStatus = event.target.value;
    setLeaveSelectedStatus(selectedStatus);
    dispatch(updateEmployeeLeave(leaveid, selectedStatus));
  };

  useEffect(() => {
    if (updatedleave) {
      window.location.reload();
    }
  }, [dispatch, updatedleave]);

  return (
    <Container className="mt-4">
      <Row>
        <Col lg="2" md="3" className="mt-4">
          <Form.Select
            size="sm"
            aria-label="Default select example"
            value={leaveType}
            onChange={handleLeaveType}
          >
            <option>Leave Type</option>
            <option value="1">Casual</option>
            <option value="2">Sick Leave</option>
            <option value="3">Optional Holiday</option>
            <option value="4">Emergency Leave</option>
          </Form.Select>
        </Col>
        <Col lg="2" md="3" className="mt-4">
          <Form.Select
            size="sm"
            aria-label="Default select example"
            value={leaveStatus}
            onChange={handleLeaveStatus}
          >
            <option>Leave Status</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
            <option value="2">Pending</option>
          </Form.Select>
        </Col>
        <Col lg="3" md="3" className="mt-4">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search Employee Name"
            aria-label="Search"
            style={{ height: "37px" }}
            value={employeeName}
            onChange={handleSearchText}
          />
        </Col>
        <Col lg="2" md="3" className="mt-4">
          <Button
            outline
            color="dark"
            rounded
            size="sm"
            type="submit"
            className="mr-auto"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Col>
        <Col lg="3" md="3">
          <Card className="border border-danger">
            <Card.Title className="text-center mt-2 text-warning">
              Pending Requests
            </Card.Title>
            <Card.Body className="text-center text-danger">
              {employeependingleaves.total_pending_leaves}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row
        md={6}
        lg={6}
        className="justify-content-lg-center justify-content-md-center mt-4"
      >
        <Col lg="12" md="12">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Employee</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Applied Date</th>
                <th scope="col">No Of Days</th>
                <th scope="col">Reason</th>
                <th scope="col">Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  Something Wrong Admin To The Rescue
                </Message>
              ) : employeeleavelist ? (
                employeeleavelist.map((employeeleave) => (
                  <tr key={employeeleave.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {employeeleave.employee_details.employee_name}
                          </p>
                          <p className="text-muted mb-0"></p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-muted mb-0">
                        {" "}
                        {employeeleave.leave_type === "1" &&
                        employeeleave.half_day === true
                          ? "Casual Leave (Half Day)"
                          : employeeleave.leave_type === "2" &&
                            employeeleave.half_day === true
                          ? "Sick Leave (Half Day)"
                          : employeeleave.leave_type === "1"
                          ? "Casual Leave"
                          : employeeleave.leave_type === "2"
                          ? "Sick Leave"
                          : employeeleave.leave_type === "3"
                          ? "Emergency Leave"
                          : employeeleave.leave_type === "4"
                          ? "Compensation Off"
                          : employeeleave.leave_type === "5"
                          ? "Optional Holday"
                          : null}{" "}
                      </p>
                    </td>
                    <td>
                      <p>{employeeleave.date_of_leave}</p>
                    </td>
                    <td>{employeeleave.no_of_leaves_required}</td>
                    <td>{employeeleave.leave_notes}</td>
                    <td>
                      {employeeleave.status === false && (
                        <Form.Select
                          size="sm"
                          variant="dark"
                          onChange={(event) =>
                            handleSelectedLeaveStatus(event, employeeleave.id)
                          }
                        >
                          <option>Pending</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                        </Form.Select>
                      )}
                      {employeeleave.status === false &&
                      employeeleave.rejected === true ? (
                        <Badge bg="danger">Rejected</Badge>
                      ) : employeeleave.status === true &&
                        employeeleave.rejected === false ? (
                        <Badge bg="success">Approved</Badge>
                      ) : null}
                    </td>
                  </tr>
                ))
              ) : (
                <Message variant="danger">
                  Something Wrong Admin To The Rescue
                </Message>
              )}
            </MDBTableBody>
          </MDBTable>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPage}
            onPageChange={handlePagination}
            containerClassName={"pagination justify-content-end"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminLeaveTable;