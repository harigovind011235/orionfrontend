import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassWord } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ChangePasswordScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (!userData) {
      navigate("/");
    }
  }, [navigate]);

  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [showMessage,setShowMessage]=useState(false)
  const [confirm_password, setConfirmPassword] = useState("");
  const[showPassword,setShowPassword]=useState({current_password:false,new_password:false,confirm_password:false})
  const changedPassword = useSelector((state) => state.changedPassWord);
  const { error, loading, changedpassword } = changedPassword;
  const dispatch = useDispatch();

  const handleClick=(name)=>{
    switch(name){
      case "current_password":
        console.log(showPassword.current_password)
        setShowPassword({current_password:!showPassword.current_password,new_password:showPassword.new_password,confirm_password:showPassword.confirm_password})
        break
      case "new_password":
        return setShowPassword({current_password:showPassword.current_password,new_password:!showPassword.new_password,confirm_password:showPassword.confirm_password})
       break

      case "confirm_password":
        setShowPassword({current_password:showPassword.current_password,new_password:showPassword.new_password,confirm_password:!showPassword.confirm_password})
      break
    }
  }
  const passwordsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(changePassWord(current_password, new_password, confirm_password));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
   setShowPassword({current_password:false,new_password:false,confirm_password:false})
  };
 
  setTimeout(() => {
    if(showMessage==true){
      setShowMessage(false)
      window.location.reload()
    }
  }, 2000);

  useEffect(()=>{
    if(changedpassword==true){
      setShowMessage(true)
     }
  },[dispatch,changedpassword])
  
  return (
    <Container style={{marginTop:"10%"}}>
      <Header />
      <Row
        md={12}
        lg={12}
        className="justify-content-lg-center justify-content-md-center mt-4"
      >
        <Col lg="4" md="4">
          {error && <Message variant="danger">{error}</Message>}
          {showMessage===true && (
            <Message variant="success">Password Changed</Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={passwordsubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <div class="position-relative mb-3" data-kt-password-meter="true">
              <Form.Control
                type={showPassword.current_password?"text":"password"}
                placeholder="Current Password"
                value={current_password}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
               <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" style={{color:"black"}}>
                <i class={showPassword.current_password? "far fa-eye":"far fa-eye-slash" }id="togglePassword" onClick={()=>handleClick("current_password")}></i>
              </span>
              </div>
            </Form.Group>
            <Form.Group >
              <Form.Label>New Password</Form.Label>
              <div class="position-relative mb-3" data-kt-password-meter="true">
              <Form.Control
                type={showPassword.new_password?"text":"password"}
                placeholder="New Password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
               <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" style={{color:"black"}}>
               <i class={showPassword.new_password? "far fa-eye":"far fa-eye-slash" } onClick={()=>handleClick("new_password")}></i>
              </span>
              </div>
            </Form.Group>

            <Form.Group >
              <Form.Label>Confirm New Password</Form.Label>
              <div class="position-relative mb-3" data-kt-password-meter="true">
                <Form.Control
                  type={showPassword.confirm_password?"text":"password"}
                  placeholder="Confirm Password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
             
              <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"style={{color:"black"}}>
              <i class={showPassword.confirm_password? "far fa-eye":"far fa-eye-slash" } onClick={()=>handleClick("confirm_password")}></i>
              </span>
              </div>
              
            </Form.Group>
            <Row className="justify-content-lg-center justify-content-md-center mt-4">
              {current_password && new_password && confirm_password ? (
                <Button variant="primary" type="submit" className="w-50">
                  Change Password
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="w-50"
                  disabled
                >
                  Change Password
                </Button>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePasswordScreen;
