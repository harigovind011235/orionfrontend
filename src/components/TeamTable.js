import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
// import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Message from "./Message";
import ReactPaginate from "react-paginate";
const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

function TeamTable() {
  let [page, setPage] = useState(1);
  const [employeelist, setEmployeeList] = useState([]);

  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { error, loading, employees } = employeeList;
  const employee_array =
    employees && employees["results"] ? employees["results"] : null;
  const totalEmployeeCount =
    employees && employees["count"] ? employees["count"] : null;

  if (
    employee_array &&
    totalEmployeeCount &&
    employeelist.length < totalEmployeeCount
  ) {
    console.log(totalEmployeeCount);
    employeelist.push(...employee_array);
  }

  const totalPage = Math.ceil(parseInt(totalEmployeeCount) / employeelist.length);

  const handlePagination = (data)=>{
    setPage(data.selected+1)
  }
  useEffect(() => {
    setEmployeeList([]);
    dispatch(listEmployees(page));
  }, [dispatch, page]);


  // const fetchData = () => {
  //   var next_page = employees["next"];
  //   if (!next_page) {
  //     setHasMore(false);
  //   } else {
  //     setPage(page + 1);
  //     const current_page = next_page ? page + 1 : null;
  //     console.log(current_page);
  //     dispatch(listEmployees(current_page));
  //   }
  // };

  // console.log(`page=${page},hasmore->${hasMore},employees->${employee_results && employee_results.length}`)

  return (
    <Container className="mt-4">
      <Row
        md={6}
        lg={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="12" md="12">
          {/* <InfiniteScroll
            dataLength={
              employeelist && employeelist.length > 0
                ? employeelist.length
                : null
            }
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          > */}
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Date Of Joining</th>
                <th scope="col">Contact</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  Something Wrong Admin To The Rescue
                </Message>
              ) : employeelist ? (
                employeelist.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={`${baseURL}${employee.profile_image}`}
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{employee.name}</p>
                          <p className="text-muted mb-0">{employee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{employee.designation}</p>
                      <p className="text-muted mb-0">{employee.location}</p>
                    </td>
                    <td>
                      {employee && employee.status === true ? (
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      ) : (
                        <MDBBadge color="primary" pill>
                          OnBoarding
                        </MDBBadge>
                      )}
                    </td>
                    <td>{employee.date_of_joining}</td>
                    <td>{employee.contact_no}</td>
                  </tr>
                ))
              ) : (
                <Message variant="danger">
                  Something Wrong Admin To The Rescue
                </Message>
              )}
            </MDBTableBody>
          </MDBTable>
          {/* </InfiniteScroll> */}
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

export default TeamTable;
