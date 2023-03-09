import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listEmployees } from "../actions/employeeActions";
import {
  OverlayTrigger,
  Tooltip,
  PopoverBody,
  Popover,
  Card,
} from "react-bootstrap";

const baseURL = process.env.REACT_APP_BACKEND_BASEURL;

function UpcomingWorkAnniversary({
  workAnniversary,
  setWorkAnniversary,
  birthday,
  holiday,
}) {
  let [page, setPage] = useState(1);
  const [employeelist, setEmployeeList] = useState([]);
  const data = [];
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { loading, error, employees } = employeeList;
  const employee_array =
    employees && employees["results"] ? employees["results"] : null;
  const date = new Date();
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

  const filteringMonth =
    employeelist &&
    employeelist.filter(
      (element1) =>
        new Date(element1.date_of_joining).getMonth() + 1 >= date.getMonth() + 1
    );

  const sortingmonth =
    filteringMonth &&
    filteringMonth.sort(
      (element1, element2) =>
        new Date(element1.date_of_joining).getMonth() -
        new Date(element2.date_of_joining).getMonth()
    );

  const sortingdate =
    sortingmonth &&
    sortingmonth.sort(
      (a, b) =>
        new Date(a.date_of_joining).getMonth() ===
          new Date(b.date_of_joining).getMonth() &&
        new Date(a.date_of_joining).getDate() -
          new Date(b.date_of_joining).getDate()
    );

  const filtering =
    sortingmonth &&
    sortingmonth.filter((el) => {
      if (
        new Date(el.date_of_joining).getMonth() + 1 >= date.getMonth() + 1 &&
        (new Date(el.date_of_joining).getMonth() === date.getMonth() &&
          date.getDate() > new Date(el.date_of_joining).getDate()) === false
      ) {
        data.push(el);
      }
    });

  const samedate =
    data &&
    data.filter(
      (e, index) =>
        new Date(data[0].date_of_joining).getMonth() ===
          new Date(e.date_of_joining).getMonth() &&
        new Date(data[0].date_of_joining).getDate() ===
          new Date(e.date_of_joining).getDate()
    );

  useEffect(() => {
    setWorkAnniversary({ loading: loading, error: error });
    setEmployeeList(employee_array);
  }, [employeeList]);

  useEffect(() => {
    setEmployeeList([]);
    dispatch(listEmployees(page));
  }, [dispatch, page]);
  return (
    <>
      {workAnniversary &&
        workAnniversary.loading === false &&
        holiday.error === undefined &&
        workAnniversary.error === undefined &&
        birthday.error === undefined && (
          <div class="container">
            <div class="card-deck">
              <div
                class="card mb-4"
                style={{ borderRadius: "20px", border: "ridge" }}
              >
                <center>
                  <Card.Header>Upcoming Work Anniversary</Card.Header>
                </center>

                <div class="card-body">
                  <center>
                    {samedate && samedate.length > 3 ? (
                      <>
                        {samedate &&
                          samedate.slice(0, 3).map((employee, index) => {
                            return (
                              <>
                                <OverlayTrigger
                                  placement="bottom"
                                  key={index}
                                  overlay={
                                    <Tooltip>
                                      <strong>{employee.name}</strong>
                                    </Tooltip>
                                  }
                                >
                                  <img
                                    src={
                                      employee.profile_image === null
                                        ? "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                        : `${baseURL}${employee.profile_image}`
                                    }
                                    alt="Avatar"
                                    className="image"
                                    style={{
                                      width: "55px",
                                      marginLeft: "-30px",
                                      height: "55px",
                                      cursor: "pointer",
                                      borderRadius: "55px",
                                    }}
                                  />
                                </OverlayTrigger>

                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover
                                      id="popover-basic"
                                      style={{ borderRadius: "20px" }}
                                    >
                                      <PopoverBody
                                        style={{
                                          height: "100px",
                                          overflowY: "auto",
                                          whiteSpace: "pre-wrap",
                                        }}
                                      >
                                        <strong>
                                          <table>
                                            <thead>
                                              <tr>
                                                <th></th>
                                                <th></th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {samedate &&
                                                samedate
                                                  .slice(3, samedate.length)
                                                  .map((el) => {
                                                    return (
                                                      <tr>
                                                        <td>
                                                          <strong>
                                                            {el.name}
                                                          </strong>
                                                        </td>
                                                        <td>
                                                          <img
                                                            src={
                                                              el.profile_image ===
                                                              null
                                                                ? "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                                                : `${baseURL}${el.profile_image}`
                                                            }
                                                            alt="Avatar"
                                                            class="rounded-circle pull-up"
                                                            style={{
                                                              width: "40px",
                                                              marginLeft:
                                                                "30px",
                                                              height: "40px",
                                                              cursor: "pointer",
                                                              borderRadius:
                                                                "50px",
                                                            }}
                                                          />
                                                        </td>
                                                      </tr>
                                                    );
                                                  })}
                                            </tbody>
                                          </table>
                                          <br />
                                        </strong>
                                      </PopoverBody>
                                    </Popover>
                                  }
                                >
                                  <span style={{ cursor: "pointer" }}>
                                    +{samedate && samedate.length - 3}
                                  </span>
                                </OverlayTrigger>
                              </>
                            );
                          })}
                      </>
                    ) : (
                      <>
                        {samedate &&
                          samedate.map((employee, index) => {
                            return (
                              <>
                                <OverlayTrigger
                                  placement="bottom"
                                  key={index}
                                  overlay={
                                    <Tooltip>
                                      <strong>{employee.name}</strong>
                                    </Tooltip>
                                  }
                                >
                                  <img
                                    src={
                                      employee.profile_image === null
                                        ? "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                                        : `${baseURL}${employee.profile_image}`
                                    }
                                    alt="Avatar"
                                    class="rounded-circle pull-up"
                                    className="image"
                                    style={{
                                      width: "55px",
                                      marginLeft: "-20px",
                                      height: "55px",
                                      cursor: "pointer",
                                      borderRadius: "55px",
                                    }}
                                  />
                                </OverlayTrigger>
                              </>
                            );
                          })}
                      </>
                    )}
                  </center>
                  <hr />
                </div>

                <p class="card-text">
                  {date.getDate() ===
                  (samedate[0] &&
                    new Date(samedate[0].date_of_joining).getDate()) ? (
                    <p
                      class="card-body text-center card-title font-weight-bold card-text"
                      style={{ color: "#55595c", marginTop: "-35px" }}
                    >
                      <i class="fa fa-calendar"></i>&nbsp;
                      {samedate[0] &&
                        month[new Date(samedate[0].date_of_joining).getMonth()]}
                      &nbsp;
                      {samedate[0] &&
                        new Date(samedate[0].date_of_joining).getDate()}
                      <br />
                      <p className="animate-charcter">
                        <i class="fa fa-trophy"></i>&nbsp;Work Anniversary&nbsp;
                        <i class="fa fa-trophy"></i>
                      </p>
                    </p>
                  ) : (
                    <p
                      class="card-body text-center card-title font-weight-bold card-text"
                      style={{ color: "#55595c", marginTop: "-33px" }}
                    >
                      <i class="fa fa-calendar"></i>&nbsp;
                      {samedate[0] &&
                        month[new Date(samedate[0].date_of_joining).getMonth()]}&nbsp;
                      {samedate[0] &&
                        new Date(samedate[0].date_of_joining).getDate()}
                      <br />
                      <p>
                        {" "}
                        Work Anniversary &nbsp;<i class="fa fa-calendar"></i>
                      </p>
                    </p>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
export default UpcomingWorkAnniversary;
