import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table } from "react-bootstrap";

import { EmployeeHolidays } from "../actions/employeeActions";
import Header from "../components/Header";

export default function HolidaysTable() {
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const dispatch=useDispatch()
  const [employeeHolidaysList,setEmployeeHolidaysList]=useState([])
  const holidaysList=useSelector((state)=>state.employeeHolidays)
  const {loading,error,holidayslist}=holidaysList

  useEffect(()=>{
    setEmployeeHolidaysList(holidayslist)
  },[holidaysList])

  useEffect(()=>{
    dispatch(EmployeeHolidays())
  },[dispatch])


  return (
    <>
      <Header />
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
            {employeeHolidaysList.map((el) => {
              return (
                <>
                  <tr>
                    <td >{el.date_of_holiday}</td>
                    <td class="text-capitalize">{el.event}</td>
                    <td class="text-capitalize">{el.region_applicable}</td>
                    <td class="text-capitalize">{el.optional_holiday===true?"Optional":"Holiday"}</td>
                    <td class="text-capitalize">{days[new Date(el.date_of_holiday).getDay()]}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </center>
    </>
  );
}
