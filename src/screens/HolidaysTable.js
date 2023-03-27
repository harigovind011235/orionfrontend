import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Table } from "react-bootstrap";

import { EmployeeHolidays } from "../actions/employeeActions";
import Header from "../components/Header";
import Message from "../components/Message";
import Loader from "../components/Loader";

export default function HolidaysTable() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dispatch = useDispatch();
  const [employeeHolidaysList, setEmployeeHolidaysList] = useState([]);
  const holidaysList = useSelector((state) => state.employeeHolidays);
  const { loading, error, holidayslist } = holidaysList;

  useEffect(() => {
    setEmployeeHolidaysList(holidayslist);
  }, [holidaysList]);

  useEffect(() => {
    dispatch(EmployeeHolidays());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container className="p-5 mt-4">
      <center>
        <Table
          striped
          bordered
          hover
          style={{ maxWidth: "1000px", marginTop: "40px" }}
        >
          <thead class="table-dark">
            <tr>
              <th>Date</th>
              <th>Holiday</th>
              <th>Region Applicable</th>
              <th>leave type</th>
              <th>day</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
             <Loader/>
            ) : error ? (
              <Message variant="danger">
                Something Wrong Admin To The Rescue
              </Message>
            ) : employeeHolidaysList ? (
              employeeHolidaysList.map((el) => {
                return (
                  <>
                    <tr>
                      <td>{el.date_of_holiday}</td>
                      <td class="text-capitalize">{el.event}</td>
                      <td class="text-capitalize">{el.region_applicable}</td>
                      <td class="text-capitalize">
                        {el.optional_holiday === true ? "Optional" : "Holiday"}
                      </td>
                      <td class="text-capitalize">
                        {days[new Date(el.date_of_holiday).getDay()]}
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <Message variant="danger">
                Something Wrong Admin To The Rescue
              </Message>
            )}
          </tbody>
        </Table>
      </center>
      </Container>
    </>
  );
}
