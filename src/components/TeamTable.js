import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import Message from "./Message";
import ReactPaginate from "react-paginate";
const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

function TeamTable() {

  let [page, setPage] = useState(1);
  const [employeelist, setEmployeeList] = useState([]);
  const [hasMore,setHasMore]=useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  console.log("list",employeeList)
  const { error, loading, employees,hasMoreItems } = employeeList;
  console.log("more",hasMoreItems)
  const employee_array =
    employees && employees["results"] ? employees["results"] : null;
  const totalEmployeeCount =
    employees && employees["count"] ? employees["count"] : null;

  if (
    employee_array &&
    totalEmployeeCount &&
    employeelist.length < totalEmployeeCount
  ) {
    employeelist.push(...employee_array);
  }

  // const totalPage = Math.ceil(parseInt(totalEmployeeCount) / 20);

  // const handlePagination = (data)=>{
  //   setPage(data.selected+1)
  // }

  // const fetchData = () => {
  //   fetch('/api/user/all')
  //   .then((response)=>response.json())
  //   .then((data=>{
  //     dispatch(listEmployees(data))
  //   }))

  // }
// console.log(employees["next"])

// const fetchData = () => {
//   console.log("nextttttttttttttttt")
//   const next_page = employees&&employees["next"]
//   if(hasMoreItems){
//     const current_page = hasMoreItems ?page +1:null
//     console.log("currentttttttttttt",current_page)
//     setPage(current_page)
//       //  setIsLoading(true)
//     dispatch(listEmployees(page))
//     // setIsLoading(false)
//   }
//   else{
//     setHasMore(false)
//     // setIsLoading(false)
    
//   }
// }

// useEffect(() => {
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, []);

// function handleScroll() {
//   if (loading) return;
//   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//   if (scrollTop + clientHeight >= scrollHeight - 5) {
//     // setPage(page+1)
//     dispatch(listEmployees(page));
//   }
// }
  const fetchData = () => {
    if (employees && employees["next"]) {
      const next_page = employees["next"];
      console.log("next",next_page)
      const current_page = next_page ? page + 1 : null;
      setPage(current_page);
      dispatch(listEmployees(current_page));
    } else {
      setHasMore(false);
    }
  };
  


  // const fetchData = () => {
  //   console.log("fecthhhhhhhhhhhhh")
  //   var next_page = employees["next"];
  //   console.log(next_page,"next")
  //   if (!next_page) {
  //     setHasMore(false);
  //   } else {
  //     const current_page = next_page && next_page ? page + 1:null;
  //     console.log(current_page,"current")  
  //     setPage(current_page)
  //     dispatch(listEmployees(current_page));

  //   }
  // }

  // var next_page = employees["next"];
  // console.log(next_page,"next")

  // const fetchData = ()=>{
  //   if (!next_page) {
  //     setHasMore(false);
  //   } else {
  //     const current_page = next_page && next_page ? page + 1:null;
  //     console.log(current_page,"current")  
  //     setPage(current_page)
  //     dispatch(listEmployees(current_page));
  //   }

  // }
  

  // console.log("page",page)

  useEffect(() => {
    setEmployeeList([]);
    dispatch(listEmployees(page));
  }, [dispatch]);

  // console.log(`page=${page},hasmore->${hasMore},employees->${employee_results && employee_results.length}`)

  return (
    <Container  className="p-4 mt-4"  onselectstart="return false">
      <Row
        md={6}
        lg={6}
        className="justify-content-lg-center justify-content-md-center"
      >
        <Col lg="12" md="12">
          <InfiniteScroll
            // pageStart={0}
            dataLength={employeelist.length}
           
            next={fetchData}
            hasMore={hasMore}
            // dataLength={page * 10}
            // pullDownToRefreshThreshold={50}
            loader={<p>loading...</p>}
            // scrollThreshold={0.8}
            // scrollableTarget="scrollableDiv"
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
          <MDBTable align="middle">
            <MDBTableHead class="table-dark">
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
                employeelist.map((employee,index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={`${baseURL}${employee.profile_image}`}
                          alt=""
                          style={{ width: "55px", height: "55px",borderRadius:"55px" }}
                          className="rounded-circle"
                          class="images"
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
              )
          }
            </MDBTableBody>
          </MDBTable>
          </InfiniteScroll>
          {/* <ReactPaginate
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
         /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default TeamTable;
