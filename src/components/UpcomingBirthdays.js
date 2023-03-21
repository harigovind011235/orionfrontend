import React, { useEffect, useState } from "react";

import {OverlayTrigger, Tooltip } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useDispatch, useSelector } from "react-redux";

import { allListEmployees} from "../actions/employeeActions";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

export default function UpcomingBirthdays({
  birthday,
  setBirthday,
  holiday,
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
  const [employeeList, setEmployeeList] = useState([]);
  const dispatch = useDispatch();
  const listOfemployees = useSelector((state) => state.allEmployeeList);
  const { loading, error, allemployees } = listOfemployees;

  const employee_array =
    allemployees && allemployees["results"] ? allemployees["results"] : null;
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
    setBirthday({ loading: loading, error: error });
  }, [listOfemployees]);

  useEffect(() => {
    setEmployeeList([]);
    dispatch(allListEmployees(1));
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
            <div class="card-deck">
              <div
                class="card mb-4"
                style={{ borderRadius: "20px", border: "ridge" }}
              >
                <div class="w-100 d-none d-sm-block d-md-none"></div>
                <div class="w-100 d-none d-lg-block d-xl-none"></div>
                <center>
                  <CardHeader>Upcoming Birthdays</CardHeader>
                </center>

                <div class="card-body">
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

                  <hr />

                  <p class="card-text" style={{ textAlign: "center" }}>
                    <p class="card-text">
                      {Upcomingdate[0] &&
                      new Date(Upcomingdate[0].dob).getDate() ===
                        date.getDate() &&
                      new Date(Upcomingdate[0].dob).getMonth() ===
                        date.getMonth() ? (
                        <>
                          <p class="card-text">
                            <i class="fa fa-calendar"></i>&nbsp;
                            {month[new Date(Upcomingdate[0].dob).getMonth()]}&nbsp;
                            {new Date(Upcomingdate[0].dob).getDate()}
                            <br />
                            {Upcomingdate.length > 1 ? (
                              <p class="card-text" className="animate-charcter">
                                Today birthdays{" "}
                                <i class="fa fa-birthday-cake"></i>
                              </p>
                            ) : (
                              <p
                                class="text-capitalize"
                                className="animate-charcter"
                              >
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
                              <p class="card-text">
                                <i class="fa fa-calendar"></i> &nbsp;
                                {
                                  month[
                                    new Date(Upcomingdate[0].dob).getMonth()
                                  ]
                                }&nbsp;
                                {new Date(Upcomingdate[0].dob).getDate()}
                                <br />
                                Upcoming{" "}
                                {Upcomingdate.length > 1
                                  ? "birthdays"
                                  : "birthday"}{" "}
                                <i class="fa fa-birthday-cake"></i>
                              </p>
                            )}
                          </p>
                        </>
                      )}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
