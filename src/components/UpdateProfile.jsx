import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UpdateProfile() {
  const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation)
      return setError("Passwords don't match");

    const promises = [];
    setLoading(true);
    setError("");
    if (email !== currentUser?.email) {
      promises.push(updateUserEmail(email));
    }
    if (password) {
      promises.push(updateUserPassword(password));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

  };
  return (
    <>
      <Card className="p-3">
        <h2 className="text-center">Update Profile</h2>
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
              onChange={(e) => setEmail(e.target.value)}
              required
              defaultValue={currentUser && currentUser.email}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password Confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
          <Button className="w-100" disabled={loading} type="submit">
            Update
          </Button>
        </Form>
        <Link to="/" className="text-center">
          Cancle
        </Link>
      </Card>
    </>
  );
}
