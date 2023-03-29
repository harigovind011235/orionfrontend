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
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Header() {
  const {employeeId} = useParams()
  const location = useLocation()
  const [active,setActive]=useState("")
  const [showBasic, setShowBasic] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = location.pathname
  const userInfo = localStorage.getItem("userInfo");
  const userJson = userInfo ? JSON.parse(userInfo) : null;
  const is_staff = userJson ? userJson["is_staff"] : null;
  let intervalId;
  const [startTime, setStartTime] = useState(localStorage.getItem('startTime') || Date.now().toString());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    localStorage.setItem('startTime', startTime);
    intervalId = setInterval(() => {
   
      setElapsedTime(Date.now() - parseInt(startTime));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  const logoutHandler = () => {
    dispatch(logout());
    clearInterval(intervalId);
    localStorage.removeItem('startTime');
    navigate("/");
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const nav = ()=>{
    switch(path){
      case "/home":
        setActive("/home")
      break
      case "/team":
        setActive("/team")
      break
      case "/changepassword":
        setActive("/changepassword")
      break
      case "/dailyhours":
        setActive("/dailyhours")
      break
      case "/leaves" :
        setActive("/leaves")
      break
      case "/applyleaves":
        setActive("/applyleaves")
      break
      case "/holidays-details":
        setActive("/holidays-details")
      break
      case "/admin/leave-requests/all":
        setActive("/admin/leave-requests/all")
      break
      case "/edit-leaves":
        setActive("/edit-leaves")
      break
      case "/edit-profiles":
        setActive("/edit-profiles")
      break
      case `/employee-editleaves/${employeeId}`:
        setActive(`/employee-editleaves/${employeeId}`)
      break
      case `/admin-editprofiles/${employeeId}`:
        setActive(`/admin-editprofiles/${employeeId}`)
      break
    }
  }
useEffect(()=>{
  nav()
},[])
 
  return (
    <MDBNavbar class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
              <LinkContainer to={"/team"}>
              <MDBNavbarItem>
                <MDBNavbarLink style={{color:active === "/team"?"black":"Gray"}} >
                  Our Team
                </MDBNavbarLink>
                </MDBNavbarItem>
              </LinkContainer>
           
            <LinkContainer to={"/changepassword"}>
              <MDBNavbarItem>
                <MDBNavbarLink style={{color:active==="/changepassword"?"black":"Gray"}}>Change Password</MDBNavbarLink>
              </MDBNavbarItem>
            </LinkContainer>
            <MDBNavbarItem style={{ marginRight: "20px" }}>
              <MDBDropdown>
                {active === "/dailyhours"|| active === "/leaves" || active === "/applyleaves"||active==="/holidays-details"?
                <>
                <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{color:"black"}}>
                  <i class="fa-sharp fa-solid fa-user-tie" ></i>
                </MDBDropdownToggle>
                </>
                :
                <>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  <i class="fa-sharp fa-solid fa-user-tie"></i>
                </MDBDropdownToggle>
                </>}
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
                  {active === "/admin/leave-requests/all" || active === "/edit-leaves" || active === "/edit-profiles"||
                  active === `/employee-editleaves/${employeeId}`||active == `/admin-editprofiles/${employeeId}`
                ?
                  <>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{color:"black"}}>
                    Admin
                  </MDBDropdownToggle>
                  </>
                  :
                  <>
                   <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Admin
                  </MDBDropdownToggle>
                  </>}
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
