import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Message from "./Message";
import Loader from "./Loader";

function DailyHourTable(props) {
  const employeeDailyHour = props.dailyhours;
  const { error, loading, employeedailyhours } = employeeDailyHour;
  return (
    <Container className="p-2 mt-4">
      {error && <Message variant="danger">Something's Broke But You Are Lucky Its Not Your Heart So We Can Fix It</Message>}
      {loading && <Loader />}

      <Row
        md={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="3" md="3" className="offset-lg-1 mt-2">
          <h2>Daily Hours</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={12} md="auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>CheckIn</th>
                <th>CheckOut</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {employeedailyhours && Array.isArray(employeedailyhours) ? employeedailyhours.map((each) => (
                <tr key={each.id}>
                  <td>{each.date_of_checkin}</td>
                  <td>{each.checkin}</td>
                  <td>{each.checkout}</td>
                  <td>{each.hours_perday}</td>
                </tr>
              )) : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyHourTable;
