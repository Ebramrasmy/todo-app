import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email format";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 8) error = "Password must be at least 8 characters";
    }

    return error;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const errorMsg = validateField("email", value);
    setErrors(prev => ({ ...prev, email: errorMsg }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const errorMsg = validateField("password", value);
    setErrors(prev => ({ ...prev, password: errorMsg }));
  };

  const validateForm = () => {
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login Successful ");
    }
  };

  const isFormValid = !errors.email && !errors.password && email !== "" && password !== "";

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}
                isInvalid={!!errors.email}
                isValid={!errors.email && email !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              {!errors.email && email !== "" && (
                <Form.Text className="text-success"> good!</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                isInvalid={!!errors.password}
                isValid={!errors.password && password !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              {!errors.password && password !== "" && (
                <Form.Text className="text-success">Password  good!</Form.Text>
              )}
              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mt-2"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
