import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    isAuthenticated: boolean;
  };
}

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
