import React from "react";
import { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import axios from "axios";
function Login() {
  const [username, SettedUser] = useState("");
  const [password, SettedPass] = useState("");
const Handle = async () => {
  try {
    const response = await fetch(
      "https://eb-backend.onrender.com/api/Login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    localStorage.setItem(
      "Userdata",
      JSON.stringify(data)
    );

  } catch (error) {
    console.log("log");
  }

  SettedUser("");
  SettedPass("");
};
  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Card
          className="signup-card"
          style={{ width: "22rem" }}
          border="danger"
        >
          <div className="justify-content-center align-items-center d-flex mt-3">
            <Card.Title className="text-danger">
              <h4>Login</h4>
            </Card.Title>
          </div>
          <Card.Body>
            <Card.Text>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="userName"
                    value={username}
                    onChange={(e) => SettedUser(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter The Password"
                    onChange={(e) => SettedPass(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
              </Form>
              <div className="justify-content-center align-items-center d-flex ">
                <Button variant="outline-danger" onClick={Handle}>
                  Login
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
