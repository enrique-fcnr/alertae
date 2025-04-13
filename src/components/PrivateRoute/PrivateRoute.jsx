import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const cliente = JSON.parse(localStorage.getItem("cliente"));

  if (!cliente) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
