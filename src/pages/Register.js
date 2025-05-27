// src/pages/Register.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/; 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/;

    switch (name) {
      case 'email':
        if (!value) error = 'Email is required';
        else if (!emailRegex.test(value)) error = 'Invalid email format';
        break;

      case 'name':
        if (!value) error = 'Name is required';
        break;

      case 'username':
        if (!value) error = 'Username is required';
        else if (!usernameRegex.test(value)) error = 'Username must not contain spaces';
        break;

      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Password must be at least 8 characters';
        else if (!passwordRegex.test(value)) 
          error = 'Password must contain at least one lowercase, uppercase, digit, and special character (*@%$#)';
        break;

      case 'confirmPassword':
        if (!value) error = 'Confirm password is required';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const errorMsg = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));

    if (name === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);

    return Object.values(newErrors).every(err => err === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Registration Successful ');
    }
  };

  const isFormValid = Object.values(errors).every(err => err === '') &&
    Object.values(formData).every(val => val !== '');

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Register</h3>
          <Form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                isValid={!errors.name && formData.name !== ''}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              {!errors.name && formData.name !== '' && (
                <Form.Text className="text-success">Looks good!</Form.Text>
              )}
            </Form.Group>
            
            {/* Email */}
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                isValid={!errors.email && formData.email !== ''}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              {!errors.email && formData.email !== '' && (
                <Form.Text className="text-success">Valid email!</Form.Text>
              )}
            </Form.Group>

            

            {/* Username */}
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                isValid={!errors.username && formData.username !== ''}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              {!errors.username && formData.username !== '' && (
                <Form.Text className="text-success">Valid username!</Form.Text>
              )}
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                isValid={!errors.password && formData.password !== ''}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              {!errors.password && formData.password !== '' && (
                <Form.Text className="text-success">Strong password!</Form.Text>
              )}
              <Form.Check
                type="checkbox"
                label="Show Password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mt-2"
              />
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                isValid={!errors.confirmPassword && formData.confirmPassword !== ''}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
              {!errors.confirmPassword && formData.confirmPassword !== '' && (
                <Form.Text className="text-success">Passwords match!</Form.Text>
              )}
              <Form.Check
                type="checkbox"
                label="Show Confirm Password"
                checked={showConfirmPassword}
                onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                className="mt-2"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
