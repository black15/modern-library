import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {

  const auth = useContext(AuthContext)

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default PrivateRoute;