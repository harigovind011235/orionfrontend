import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeHolidays } from "../actions/employeeActions";

export default function UpcomingHolidays({
  holiday,
  setHoliday,
  birthday,
  workAnniversary,
}) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dispatch = useDispatch();
  const [employeeHolidaysList, setEmployeeHolidaysList] = useState([]);
  const holidaysList = useSelector((state) => state.employeeHolidays);
  const { loading, error, holidayslist } = holidaysList;
  const currentDate = new Date();

  const filteredUpcomingDate =
    employeeHolidaysList &&
    employeeHolidaysList.filter((date) => {
      return new Date(date.date_of_holiday) >= currentDate;
    });

  useEffect(() => {
    setEmployeeHolidaysList(holidayslist);
    setHoliday({ loading: loading, error: error });
  }, [holidaysList]);

  useEffect(() => {
    dispatch(EmployeeHolidays());
  }, [dispatch]);

  return (
    <>
    {holiday &&
        holiday.loading === false &&
        holiday.error === undefined &&
        workAnniversary.error === undefined &&
        birthday.error === undefined && (
    <div class="container" >
    <div class="card-deck">
      
        <div class="card mb-4" style={{borderRadius:"20px",border:"ridge"}} >
        <center> <Card.Header>Upcoming Holidays</Card.Header></center>
            <div class="card-body">
              
                <p class="card-text" style={{marginLeft:"35px"}}>
                  <br/>
                {filteredUpcomingDate &&
                        filteredUpcomingDate.slice(0, 2).map((el) => {
                          return (
                            <>
                              <p
                                style={{
                                  color: "#55595c",
                                  textAlign: "left",
                                  marginTop:"20px"
                                 
                                 
                                }}
                                class="card-text"
                              >
                                <i
                                  class="fas fa-stop-circle"
                                  style={{ fontSize: "13px" }}
                                ></i>
                                &nbsp;
                                {el.event} on &nbsp;
                                {month[new Date(el.date_of_holiday).getMonth()]}
                                &nbsp;
                                {new Date(el.date_of_holiday).getDate()}
                              </p>
                            </>
                          );
                        })}
                </p>
              <br/>
            </div>
        </div>
        </div>
        </div>)}
    </>
  );
}
