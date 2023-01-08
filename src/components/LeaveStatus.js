import React from 'react'
import { Container,Row,Col,Table,Button } from 'react-bootstrap'
import Message from './Message'
import Loader from './Loader'

function LeaveStatus(props) {
  const employeeLeaveStatus = props.employeeLeaveStatus;
  const { error, loading, employeeleavestatus } = employeeLeaveStatus;
  return (
    <Container className='mt-4'>
      {error && <Message>Something's Broke But You Are Lucky Its Not Your Heart So We Can Fix It</Message>}
      {loading && <Loader/>}
        <Row md={6} className="justify-content-lg-center justify-content-md-center">
            <Col lg="4" md="3" className='offset-lg-1'>
            <h2>Leave Status</h2>
            </Col>
        </Row>
        <Row md={6} lg={6} className="justify-content-lg-center justify-content-md-center">
      <Col lg="12" md="12">
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Type Of Leave</th>
          <th>Date</th>
          <th>Notes</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(employeeleavestatus) ? employeeleavestatus.map((each) => (
        <tr key={each.id}>
        <td>{each.leave_type === '1' ? 'Casual' : each.leave_type === '2' ? 'Sick Leave' : each.leave_type === '3' ? 'Emergency' : each.leave_type === '4' ? 'Compenstaion Off' :'optional holiday'}</td>
        <td>{each.date_of_leave}</td>
        <td>{each.leave_notes ? each.leave_notes : "null"}</td>
        <td>{each.status === true ? "Approved" : <p>Pending</p>}</td>
        <td><Button variant="outline-dark" size="sm" disabled={each.status === true}>Cancel</Button></td>
      </tr>

      )):<Message variant="danger">Backend Server Down Contact The Admin</Message>}

      </tbody>
    </Table>
      </Col>
    </Row>
    </Container>
  )
}

export default LeaveStatus