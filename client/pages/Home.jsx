import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import ApiService from "../src/Api";

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [receivedMessage, setReceivedMessage] = useState("");

  const handleSignUp = async () => {
    try {
      await ApiService.signUp(username, password);
      setReceivedMessage("User signed up successfully.");
    } catch (error) {
      setReceivedMessage("Error signing up: " + error.message);
    }
  };
  const handleLogIn = async () => {
    try {
      const response = await ApiService.LogIn(username, password);
      setReceivedMessage("User Logged in successfully.");
      const token = response.data.token;
      localStorage.setItem("token", token);
    } catch (error) {
      setReceivedMessage("Error Logging in: " + error.message);
    }
  };
  return (
    <Container
      className="h-100 d-flex align-items-center justify-content-center"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="p-4 border border-success rounded">
        <div className="mb-4">
          <h2>Welcome to the app!</h2>
        </div>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="test username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Button variant="primary" type="submit" onClick={handleSignUp}>
                Signup
              </Button>
              <Button variant="success" type="submit" onClick={handleLogIn}>
                Login
              </Button>
            </div>
          </Form>
          {receivedMessage && <div>{receivedMessage}</div>}
        </div>
      </div>
    </Container>
  );
}

export default Home;
