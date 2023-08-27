import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation)
      return setError("Passwords don't match");
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/signin");
    } catch (error) {
      setError("Failed to create account");
    }

    setLoading(false);
  };

  return (
    <>
      <Card className="p-3">
        <h2 className="text-center">Signup</h2>
        {error && (
          <Alert variant="danger" className="p-1">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              required
              placeholder="Password Confirmation"
              minLength={6}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
          <Button className="w-100" type="submit" disabled={loading}>
            Sign Up
          </Button>
        </Form>
      </Card>
      <p className="text-center mt-2">
        Already have an account? <Link to="/signin">Signin</Link>
      </p>
    </>
  );
}
