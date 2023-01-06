import React, { useEffect, useState,useRef } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Message from "./Message";

function TeamTable() {
  
  let [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [employeelist,setEmployeeList] = useState([])
  
  const tbodyRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);
  
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { error, loading, employees } = employeeList;
  const employee_array = employees && employees['results'] ? employees["results"] : null;
  const totalEmployeeCount = employees && employees['count'] ? employees["count"] : null;
  
  if (employee_array && totalEmployeeCount && employeelist.length < totalEmployeeCount){
    console.log(totalEmployeeCount)
    employeelist.push(...employee_array)
  }

  useEffect(() => {
    setEmployeeList([])
    dispatch(listEmployees(page));
  }, [dispatch]);

  const fetchData = () => {
    setScrollPos(tbodyRef.current.scrollTop);
    var next_page = employees['next']
    if (!next_page){
      setHasMore(false);
    }
    else{
      setPage(page + 1);
      const current_page = next_page ? page + 1 : null
      console.log(current_page)
      dispatch(listEmployees(current_page));
    }
  };

  useEffect(() => {
    tbodyRef.current.scrollTop = scrollPos;
  }, [employee_array]);

  // console.log(`page=${page},hasmore->${hasMore},employees->${employee_results && employee_results.length}`)

  return (
    <Container className="mt-4">
      <Row
        md={6}
        lg={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="12" md="12">
        <InfiniteScroll
      dataLength={employeelist && employeelist.length > 0 ? employeelist.length : null}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader/>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Date Of Joining</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
            </thead>
              <tbody ref={tbodyRef}>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">
                    Something Wrong Admin To The Rescue
                  </Message>
                ) : employeelist ? (
                  employeelist.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.date_of_joining}</td>
                      <td>{employee.contact_no}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))
                ) : (
                  <Message variant="danger">
                    Something Wrong Admin To The Rescue
                  </Message>
                )}
              </tbody>
          </Table>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

export default TeamTable;
