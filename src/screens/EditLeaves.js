import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
import Header from "../components/Header";

import Loader from "../components/Loader";
import Message from "../components/Message";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";


function EditLeaves() {
  let [page, setPage] = useState(1);
  const [employeelist, setEmployeeList] = useState([]);
  const [searchdata,setSearchdata]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const employeeList = useSelector((state) => state.employeeList);

  const { error, loading, employees } = employeeList;
  const employee_array =
    employees && employees["results"] ? employees["results"] : null;
  const totalEmployeeCount =
    employees && employees["count"] ? employees["count"] : null;

    const sortedData = employee_array&&employee_array.sort((element1,element2)=>
    element1["name"].toLowerCase()<element2["name"].toLowerCase()?-1:1)


  if (
    employee_array &&
    totalEmployeeCount &&
    employeelist.length < totalEmployeeCount && employeelist.length ===0
  ) {
    employeelist.push(...sortedData);
  }

  const totalPage = Math.ceil(parseInt(totalEmployeeCount) / 20);

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };

  const handleEditButton = (id) => {
    navigate(`/employee-editleaves/${id}`)
  }


  const handleSearch = (e) => {
    setSearchdata(e.target.value)
    }

  const filterdata = employeelist && employeelist.filter((item)=>item.name.toLowerCase().startsWith(searchdata.toLowerCase()))
  
  useEffect(() => {
    setEmployeeList([]);
    dispatch(listEmployees(page));
  }, [dispatch, page]);
  return (
    <div>
      <Header />
      <br />
    <div class= "d-flex justify-content-around" style={{marginLeft:"700px",marginTop:"7%"}}>
      <div class="input-group" style={{maxWidth:"250px"}}>
        <input
          type="search"
          class="form-control rounded border border-dark"
          placeholder="Search Employee Name"
          onChange={handleSearch}
        />
        </div>
      </div>
      <Container className="mt-4">
        <Row
          md={5}
          lg={5}
          className="justify-content-lg-center justify-content-md-center"
        >
          <Col lg="9" md="9">
            <Table striped bordered hover>
              <thead class="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">
                    Something Wrong Admin To The Rescue
                  </Message>
                ) : filterdata.length !==0 ? (
                  filterdata.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <p className="fw-bold mb-1" style={{ fontSize: "15px", fontWeight: 'bold' }}>{employee.name.substring(0, 1).toUpperCase() + employee.name.substring(1, employee.name.length)}</p>
                      </td>
                      <td>
                        <button
                          type="submit"
                          class="rounded-pill "
                          onClick={() => handleEditButton(employee.id)}
                          style={{
                            background: "#232E48",
                            width: "65px",
                            height: "35px",
                            color: "white",
                            fontSize:"10px",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                          </svg>
                          &nbsp;
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <Message variant="info">
                    Employee not found!
                  </Message>
                )}
              </tbody>
            </Table>
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
    </div>
  );
}

export default EditLeaves;