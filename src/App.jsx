import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import ForgetPassword from "./components/ForgetPassword";
import UpdateProfile from "./components/UpdateProfile";
import Root from "./components/Root";
import { Container } from "react-bootstrap";
import AuthContextProvider from "./context/AuthContext";
import ProdectedRoute from "./context/ProdectedRoute";

const router = createHashRouter([
  {
    path: "",
    element: (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </Container>
    ),
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "",
        element: (
          <ProdectedRoute>
            <Dashboard />
          </ProdectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
