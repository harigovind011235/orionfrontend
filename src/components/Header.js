import React, { useState,useEffect } from "react";
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
  const [date, setDate] = useState(new Date());
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userJson = userInfo ? JSON.parse(userInfo) : null;
  const is_staff = userJson ? userJson["is_staff"] : null;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    var timerID = setInterval( () => setDate(new Date()), 1000 );
    return function cleanup() {
        clearInterval(timerID);
      };
   });

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
                    <LinkContainer to={"/all-pending-leaves"}>
                      <MDBNavbarLink>Leave Requests</MDBNavbarLink>
                    </LinkContainer>
                    <LinkContainer to={"/edit-leaves"}>
                      <MDBNavbarLink>Edit Leaves</MDBNavbarLink>
                    </LinkContainer>
                    <LinkContainer to={"/edit-profiles"}>
                      <MDBNavbarLink>Edit Profiles</MDBNavbarLink>
                    </LinkContainer>
                    <LinkContainer to={"/admin/leave-requests/all"}>
                      <MDBNavbarLink>All Leaves</MDBNavbarLink>
                    </LinkContainer>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            ) : null}
          </MDBNavbarNav>
          {location.pathname === "/home" &&
          <div style={{marginRight:"20px",marginTop:"15px"}} >
              <h4>{date.toLocaleTimeString()}</h4>
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
