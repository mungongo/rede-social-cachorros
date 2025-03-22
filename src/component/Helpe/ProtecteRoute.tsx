import { useUser } from "../../contexts/UserContext.tsx";
import { Navigate } from "react-router-dom";

interface ProtecteRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtecteRouteProps) => {
    const { login } = useUser();

    return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
