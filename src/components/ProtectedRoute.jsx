import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredAdmin }) {
  const { user } = useAuth();
  const userRole = useSelector((state) => state.userRole.role);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requiredAdmin && requiredAdmin !== userRole) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
