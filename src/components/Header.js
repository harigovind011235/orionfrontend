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
  const storedTime = JSON.parse(localStorage.getItem('timer')) || { hours: 0, minutes: 0, seconds: 0 };
  const [time, setTime] = useState(storedTime);
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  const userJson = userInfo ? JSON.parse(userInfo) : null;
  const is_staff = userJson ? userJson["is_staff"] : null;

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear("timer")
    navigate("/");
  };
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + (seconds === 60 ? 1 : 0);
        const hours = prevTime.hours + (minutes === 60 ? 1 : 0);
        return { hours, minutes: minutes % 60, seconds: seconds % 60 };
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(time));
  }, [time]);

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
              <h5><span>{time.hours}:{time.minutes < 10 ? '0' + time.minutes : time.minutes}:{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span></h5>
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
