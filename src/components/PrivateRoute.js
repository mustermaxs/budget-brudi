import { React, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, permissions, ...rest }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const isAuthenticated = user.isLoggedIn;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!permissions.includes(user?.role)) {
      navigate("/profile");

    }

  }, [isAuthenticated, permissions, navigate, user]);

  if (!isAuthenticated || !permissions.includes(user?.role)) {

    // Return null to avoid rendering the component
    return null;
  }

  // Render the protected component if user is authenticated and has the required permissions
  return <Component {...rest} />;
};

export default PrivateRoute;
