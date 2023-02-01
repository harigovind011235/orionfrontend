import React, { useEffect } from "react";
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
  const employeesPendingLeaves = useSelector(
    (state) => state.adminPendingLeaves
  );
  const { error, loading, pendingleaves } = employeesPendingLeaves;
  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
    dispatch(getPendingLeaves());
  }, [navigate]);

  return (
    <>
      <Header />
      <Table striped bordered hover style={{ marginTop: "100px" }}>
        <thead>
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
          ) : pendingleaves ? (
            pendingleaves.map((each) => (
              <tr>
                <td>
                  <Link to={`/employee-pendingleaves/${each.employee_id}`} style={{ textDecoration: 'none' }}>
                    {each.employee_name}
                  </Link>
                </td>
                <td>{each.count}</td>
              </tr>
            ))
          ) : null}
        </tbody>
      </Table>
    </>
  );
}

export default AdminPendingLeaves;
