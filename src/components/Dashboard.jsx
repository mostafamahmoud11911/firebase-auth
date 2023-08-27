import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      setError("");
      await signout();
      navigate("signin");
    } catch (error) {
      setError("failed to logout");
    }
  };
  return (
    <>
      <Card>
        <h2 className="text-center">Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong className="my-2">{currentUser && currentUser.email}</strong>
        <Link className="btn btn-primary" to="/update-profile">
          Update Profile
        </Link>
        <Button className="mt-2" onClick={handleSignOut}>
          Sign out
        </Button>
      </Card>
    </>
  );
}
