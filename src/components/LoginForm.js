import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login,showUserMessage } from "../actions/userActions";
import Loader from "./Loader";
import Message from "./Message";

function LoginForm() {
  const [username, setEnteredUserName] = useState("");
  const [password, setEnteredPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
      dispatch(showUserMessage())
    }
  }, [userInfo, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
    setEnteredUserName("");
    setEnteredPassword("");
  };

  return (
    <div className="login-form p-2">
      {error && (
        <Message variant="danger">
          No Account Found With This Credentials
        </Message>
      )}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setEnteredUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          className="login-button offset-3"
          variant="success"
          type="submit"
        >
          Check In
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
