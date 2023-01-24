import React, { useState } from "react";
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

export default function Header() {
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
                    <LinkContainer to={"/edit-profiles"}>
                      <MDBNavbarLink>Add Profiles</MDBNavbarLink>
                    </LinkContainer>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
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
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>

          <MDBBtn color="danger" onClick={logoutHandler}>
            CheckOut
          </MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
