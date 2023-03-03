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
          <div class="container">
            <div class="card-deck row">
              <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>
                <div
                  class="card testimonial-card mt-2 mb-3"
                  style={{
                    maxWidth: "350px",
                    height: "230px",
                    borderRadius: "20px",
                    border: "ridge",
                  }}
                >
                  <div class="card-up aqua-gradient"></div>
                  <center><Card.Header style={{fontWeight:"bold"}}>Upcoming  Holidays</Card.Header></center>
                  <div class="avatar mx-auto white">
                    <br />
                    <center>
                      {filteredUpcomingDate &&
                        filteredUpcomingDate.slice(0, 2).map((el) => {
                          return (
                            <>
                              <p
                                style={{
                                  color: "#55595c",
                                  textAlign: "left",
                                 
                                  marginTop: "25px",
                                }}
                                class="text-capitalize"
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
                    </center>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
    </>
  );
}
