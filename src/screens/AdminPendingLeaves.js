import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { getPendingLeaves } from "../actions/adminActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function AdminPendingLeaves() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leavesList, setLeavesList] = useState([]);
  const employeesPendingLeaves = useSelector(
    (state) => state.adminPendingLeaves
  );
  const { error, loading, pendingleaves } = employeesPendingLeaves;

  const handleSearchFilter = (e) => {
    if (e.target.value !== "") {
      const filteredValues =
        leavesList &&
        leavesList.filter((item) =>
          item["employee_name"]
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase())
        );
      setLeavesList(filteredValues);
    } else {
      setLeavesList(pendingleaves);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
    dispatch(getPendingLeaves());
  }, [navigate]);

  useEffect(() => {
    setLeavesList(pendingleaves.sort((element1, element2) => {
      return element1.employee_name >= element2.employee_name ? 1 : -1;
    }));
  }, [employeesPendingLeaves]);

  return (
    <>
      <Header />
      <br />
      <div class="row height d-flex justify-content-center align-items-center">
        <div
          class="input-group"
          style={{ maxWidth: "300px", marginLeft: "730px" }}
        >
          <input
            type="search"
            class="form-control rounded border border-dark"
            placeholder="Search Employee Name"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleSearchFilter}
          />
          &nbsp;&nbsp;
        </div>
      </div>
      <div>
        <center>
          <Table
            striped
            bordered
            hover
            style={{ maxWidth: "1000px", marginTop: "20px" }}
          >
            <thead class="table-dark">
              <tr>
                <th>Employee</th>
                <th>Pending Requests</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger"></Message>
              ) : leavesList.length !== 0 ? (
                leavesList.map((each) => (
                  <tr>
                    <td>
                      <Link
                        to={`/employee-pendingleaves/${each.employee_id}`}
                        style={{ textDecoration: "none" }}
                        class="text-capitalize"
                      >
                        {each.employee_name}
                      </Link>
                    </td>
                    <td>{each.count}</td>
                  </tr>
                ))
              ) : <Message variant="info">
                Employee not found!
                </Message>}
            </tbody>
          </Table>
        </center>
      </div>
    </>
  );
}

export default AdminPendingLeaves;
