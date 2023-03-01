import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Header() {
  const location = useLocation()
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const userJson = userInfo ? JSON.parse(userInfo) : null;
  const is_staff = userJson ? userJson["is_staff"] : null;
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    setStartTime(null);
    setStopTime(null);
    setElapsedTime(0);
    setIsRunning(false);
    localStorage.removeItem("startTime");
    localStorage.removeItem("stopTime");
    navigate("/");
  };

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    const storedStopTime = localStorage.getItem("stopTime");
    if (storedStartTime && storedStopTime) {
      setStartTime(parseInt(storedStartTime));
      setStopTime(parseInt(storedStopTime));
      setElapsedTime(parseInt(storedStopTime) - parseInt(storedStartTime));
      setIsRunning(false);
    } else if (storedStartTime) {
      setStartTime(parseInt(storedStartTime));
      setElapsedTime(Date.now() - parseInt(storedStartTime));
      setIsRunning(true);
    } else {
      handleStart();
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning, startTime]);

  useEffect(() => {
    if (startTime && stopTime) {
      localStorage.setItem("startTime", startTime);
      localStorage.setItem("stopTime", stopTime);
    } else if (startTime) {
      localStorage.setItem("startTime", startTime);
      localStorage.removeItem("stopTime");
    } else {
      localStorage.removeItem("startTime");
      localStorage.removeItem("stopTime");
    }
  }, [startTime, stopTime]);

  const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
 
  return (
    <MDBNavbar expand="lg">
      <MDBContainer>
        <LinkContainer to={"/home"}>
          <MDBNavbarBrand>Orion</MDBNavbarBrand>
        </LinkContainer>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 ml-4">
            <MDBNavbarItem>
              <LinkContainer to={"/team"}>
                <MDBNavbarLink active aria-current="page">
                  Our Team
                </MDBNavbarLink>
              </LinkContainer>
            </MDBNavbarItem>
            <LinkContainer to={"/changepassword"}>
              <MDBNavbarItem>
                <MDBNavbarLink>Change Password</MDBNavbarLink>
              </MDBNavbarItem>
            </LinkContainer>
            <MDBNavbarItem style={{ marginRight: "20px" }}>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  <i class="fa-sharp fa-solid fa-user-tie"></i>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <LinkContainer to={"/dailyhours"}>
                    <MDBNavbarLink>Daily Hours</MDBNavbarLink>
                  </LinkContainer>
                  <LinkContainer to={"/leaves"}>
                    <MDBNavbarLink>Leaves</MDBNavbarLink>
                  </LinkContainer>
                  <LinkContainer to={"/applyleaves"}>
                    <MDBNavbarLink>Apply Leave</MDBNavbarLink>
                  </LinkContainer>
                  <LinkContainer to={"/holidays-details"}>
                    <MDBNavbarLink>Holidays</MDBNavbarLink>
                  </LinkContainer>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            {is_staff ? (
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Admin
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                  <LinkContainer to={"/admin/leave-requests/all"}>
                      <MDBNavbarLink>Leave Requests</MDBNavbarLink>
                    </LinkContainer>
                    <LinkContainer to={"/edit-leaves"}>
                      <MDBNavbarLink>Edit Leaves</MDBNavbarLink>
                    </LinkContainer>
                    <LinkContainer to={"/edit-profiles"}>
                      <MDBNavbarLink>Edit Profiles</MDBNavbarLink>
                    </LinkContainer>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            ) : null}
          </MDBNavbarNav>
          {location.pathname === "/home" &&
            <div style={{ marginRight: "30px", marginTop: "15px",color:"#0C0B0B" }} >
            <h5><span>{formatTime(elapsedTime)}</span></h5>
            </div>
          }
          <MDBBtn color="danger" onClick={logoutHandler}>
            CheckOut
          </MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
