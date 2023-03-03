import React, { useEffect, useState } from "react";

import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { listEmployees } from "../actions/employeeActions";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export default function UpcomingBirthdays({ birthday,setBirthday,holiday,workAnniversary }) {
  
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
  const [employeeList, setEmployeeList] = useState([]);
  const dispatch = useDispatch();
  const listOfemployees = useSelector((state) => state.employeeList);
  const { loading, error, employees } = listOfemployees;
  
  const employee_array =
    employees && employees["results"] ? employees["results"] : null;
  const date = new Date();

  const filteredUpcomingMonth =
    employeeList &&
    employeeList.filter(
      (el) => new Date(el.dob).getMonth() + 1 >= date.getMonth() + 1
    );
  const Sortingdata =
    filteredUpcomingMonth &&
    filteredUpcomingMonth.sort(
      (a, b) => new Date(a.dob).getMonth() - new Date(b.dob).getMonth()
    );
  const SortingbyDate =
    Sortingdata &&
    Sortingdata.sort(
      (a, b) =>
        new Date(a.dob).getMonth() === new Date(b.dob).getMonth() &&
        new Date(a.dob).getDate() - new Date(b.dob).getDate()
    );

  const filteredUpcomingDate = [];
  const SortingbyfilteredUpcomingDate =
    Sortingdata &&
    Sortingdata.filter((el) => {
      if (
        new Date(el.dob).getMonth() + 1 >= date.getMonth() + 1 &&
        (new Date(el.dob).getMonth() === date.getMonth() &&
          date.getDate() > new Date(el.dob).getDate()) === false
      ) {
        filteredUpcomingDate.push(el);
      }
    });

  const Upcomingdate =
    filteredUpcomingDate &&
    filteredUpcomingDate.filter(
      (dt, index) =>
        new Date(filteredUpcomingDate[0].dob).getMonth() ===
          new Date(dt.dob).getMonth() &&
        new Date(filteredUpcomingDate[0].dob).getDate() ===
          new Date(dt.dob).getDate()
    );

  useEffect(() => {
    setEmployeeList(employee_array && employee_array);
    setBirthday({loading:loading,error:error})
    
  }, [listOfemployees]);
 
  useEffect(() => {
    setEmployeeList([])
    dispatch(listEmployees(1));
  }, [dispatch]);

  return (
    <>
      {birthday &&
        birthday.loading === false &&
        holiday.error === undefined &&
       workAnniversary.error === undefined &&
        birthday.error === undefined &&
        Upcomingdate && (
          <div class="container">
            <div class="card-deck row">
            <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>
              <div
                class="card testimonial-card mt-2 mb-3 "
                style={{
                  maxWidth: "350px",
                  height: "230px",
                  borderRadius: "20px",
                  border: "ridge",
                }}
              >
                <div class="card-up aqua-gradient"></div>
                <center><Card.Header style={{fontWeight:"bold"}}>Upcoming  Birthdays</Card.Header></center>
                <div class="avatar mx-auto white"></div>
                <div class="avatar mx-auto white">
                  <br />
                  <center>
                    <div>
                      {filteredUpcomingDate &&
                        Upcomingdate.map((element, index) => {
                          return (
                            <>
                              <OverlayTrigger
                                key={index}
                                placement="bottom"
                                overlay={
                                  <Tooltip>
                                    <strong>{element.name}</strong>
                                  </Tooltip>
                                }
                              >
                                <img
                                  src={
                                    element.profile_image === null
                                      ? "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                      : `${baseURL}${element.profile_image}`
                                  }
                                  alt=""
                                  style={{
                                    width: "55px",
                                    marginLeft: "-25px",
                                    height: "55px",
                                    cursor: "pointer",
                                    borderRadius: "50px",
                                  }}
                                  className="image"
                                />
                              </OverlayTrigger>
                            </>
                          );
                        })}
                    </div>
                  </center>
                </div>
                <hr />
                <div class="card-body text-center" style={{color: "#55595c"}}>
                  <p style={{marginTop: "-20px" }}>
                    {Upcomingdate[0] &&
                    new Date(Upcomingdate[0].dob).getDate() ===
                      date.getDate() &&
                    new Date(Upcomingdate[0].dob).getMonth() ===
                      date.getMonth() ? (
                      <>
                        <p>
                          <i class="fa fa-calendar"></i>&nbsp;
                          {month[new Date(Upcomingdate[0].dob).getMonth()]},
                          {new Date(Upcomingdate[0].dob).getDate()}
                          <br/>
                          {Upcomingdate.length > 1 ? (
                            <p  className="animate-charcter">
                              Today birthdays{" "}
                              <i class="fa fa-birthday-cake"></i>
                              
                            </p>
                          ) : (
                            <p class="text-capitalize" className="animate-charcter" >
                              Today's {Upcomingdate[0].name} birthday{" "}
                              <i class="fa fa-birthday-cake"></i>
                            </p>
                          )}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          {Upcomingdate[0] && (
                            <p>
                              <i class="fa fa-calendar"></i> &nbsp;
                              {month[new Date(Upcomingdate[0].dob).getMonth()]}
                              {new Date(Upcomingdate[0].dob).getDate()}
                              <br />
                              Upcoming {Upcomingdate.length > 1 ? "birthdays":"birthday"}  <i class="fa fa-birthday-cake"></i>
                            </p>
                          )}
                        </p>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </section>
            </div>
          </div>
        )}
    </>
  );
}
