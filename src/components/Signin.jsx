import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to login");
    }

    setLoading(false);
  };

  return (
    <>
      <Card className="p-3">
        <h2 className="text-center">Signin</h2>
        {error && (
          <Alert variant="danger" className="p-1">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              minLength={6}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={6}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="w-100" disabled={loading} type="submit">
            Sign in
          </Button>
        </Form>
        <Link to="/forget-password" className="text-center">
          Forget Password
        </Link>
      </Card>
      <p className="text-center mt-2">
        Need an account? <Link to="/signup">Signup</Link>
      </p>
    </>
  );
}
