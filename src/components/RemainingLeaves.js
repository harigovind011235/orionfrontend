import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Message from './Message'
import Loader from './Loader'

function RemainingLeaves(props) {
  const employeeRemainingLeaves = props.employeeRemainingLeaves;
  const { error, loading, employeeremainingleaves } = employeeRemainingLeaves;
  return (
    <Container className="mt-4">
      {error && <Message>Something's Broke But You Are Lucky Its Not Your Heart So We Can Fix It</Message>}
      {loading && <Loader/>}
      <Row
        md={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="4" md="3" className="offset-lg-1">
          <h2>Remaining Leaves</h2>
        </Col>
      </Row>

      <Row
        md={6}
        lg={6}
        className="justify-content-lg-center justify-content-md-center mt-4"
      >
        <Col lg="12" md="12">
          <Table striped bordered hover >
            <thead class="table-dark">
              <tr>
                <th>Type Of Leave</th>
                <th>Leaves Left</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Casual</td>
                <td>{employeeremainingleaves ? employeeremainingleaves.casual_leave : null}</td>
              </tr>
              <tr>
                <td>Sick Leave</td>
                <td>{employeeremainingleaves ? employeeremainingleaves.sick_leave : null}</td>
              </tr>
              <tr>
                <td>Emergency</td>
                <td>{employeeremainingleaves ? employeeremainingleaves.emergency_leave : null}</td>
              </tr>
              <tr>
                <td>Compensation Off</td>
                <td>{employeeremainingleaves ? employeeremainingleaves.comp_off : null}</td>
              </tr>
              <tr>
                <td>Optional Holidays</td>
                <td>{employeeremainingleaves ? employeeremainingleaves.optional_holidays : null}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default RemainingLeaves;
