import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "staff@clinic.com" && password === "123456") {
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
    >
      <Form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h4 className="mb-3 text-center">Staff Login</h4>
        <Form.Group className="mb-3">
          <Form.Label className="form-label text-start w-100">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label text-start w-100">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary mb-3" type="submit" className="w-100">
          Login
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default LoginForm;
