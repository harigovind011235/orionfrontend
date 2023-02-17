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
  const [confirm_password, setConfirmPassword] = useState("");

  const changedPassword = useSelector((state) => state.changedPassWord);
  const { error, loading, changedpassword } = changedPassword;

  const dispatch = useDispatch();
  
  const passwordsubmitHandler = (event) => {
    event.preventDefault();
    if (current_password && new_password && confirm_password) {
      dispatch(
        changePassWord(current_password, new_password, confirm_password)
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Container>
      <Header />
      <Row
        md={12}
        lg={12}
        className="justify-content-lg-center justify-content-md-center mt-4"
      >
        <Col lg="4" md="4">
          {error && <Message variant="danger">{error}</Message>}
          {changedpassword && (
            <Message variant="success">Password Changed</Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={passwordsubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                value={current_password}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={new_password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Row className="justify-content-lg-center justify-content-md-center mt-4">
              <Button
                variant="outline-dark"
                type="submit"
                className="w-50"
              >
                Change Password
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePasswordScreen;
