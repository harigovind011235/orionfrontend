import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeHolidays } from "../actions/employeeActions";

export default function UpcomingHolidays() {
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
  const { holidayslist } = holidaysList;
  const currentDate = new Date();

  const filteredUpcomingDate =
    employeeHolidaysList &&
    employeeHolidaysList.filter((date) => {
      return new Date(date.date_of_holiday) >= currentDate;
    });

  useEffect(() => {
    setEmployeeHolidaysList(holidayslist);
  }, [holidaysList]);

  useEffect(() => {
    dispatch(EmployeeHolidays());
  }, [dispatch]);

  return (
    <>
      <div class="container">
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
            <div class="avatar mx-auto white">
              <br />
              <center>
                <p
                  style={{
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Upcoming Holidays
                </p>

                {filteredUpcomingDate &&
                  filteredUpcomingDate.slice(0, 4).map((el) => {
                    return (
                      <>
                        <p
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            textAlign: "left",
                            marginLeft: "50px",
                            marginTop: "25px",
                          }}
                          class="text-capitalize"
                        >
                          <span id="boot-icon" class="fa fa-calendar"></span>
                          &nbsp;
                          {el.event} on{" "}
                          {month[new Date(el.date_of_holiday).getMonth()]}{" "}
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
    </>
  );
}
