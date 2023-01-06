
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
import { LinkContainer} from "react-router-bootstrap";
import {logout} from '../actions/userActions'
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"


export default function Header() {
  

  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const logoutHandler = () => {
      
    dispatch(logout())
    navigate('/')


  }

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

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Attendence
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <LinkContainer to={'/dailyhours'}>
                    <MDBNavbarLink>
                      Daily Hours
                    </MDBNavbarLink>
                  </LinkContainer>
                  <LinkContainer to={'/leaves'}>
                    <MDBNavbarLink>
                      Leaves
                    </MDBNavbarLink>
                  </LinkContainer>
                  <LinkContainer to={'/applyleaves'}>
                    <MDBNavbarLink>
                      Apply Leave
                    </MDBNavbarLink>
                  </LinkContainer>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <MDBBtn color="danger" onClick={logoutHandler}>CheckOut</MDBBtn>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
