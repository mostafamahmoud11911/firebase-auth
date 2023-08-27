import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgetPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPass = async (e) => {
    e.preventDefault();


      try {
        setError("");
        setLoading(true);
        await resetPassword(email);
        setMessage("check your inbox");
      } catch (error) {
        setError("Failed to Reset password");
      }
    
    setLoading(false);
  };

  return (
    <>
      <Card className="p-3">
        <h2 className="text-center">Reset Password</h2>
        {error && (
          <Alert variant="danger" className="p-1">
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success" className="p-1">
            {message}
          </Alert>
        )}
        <Form onSubmit={handleResetPass}>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@Email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button className="w-100" type="submit" disabled={loading}>
            Reset Password
          </Button>
        </Form>
        <Link to="/signin" className="text-center">
          Signin
        </Link>
      </Card>
      <p className="text-center mt-2">
        Need an account? <Link to="/signup">Signup</Link>
      </p>
    </>
  );
}
