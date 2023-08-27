import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProdectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }
  return <Navigate to="/signin" />;
}
