import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../components/hook/auth.jsx";

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={({ location }) => {
        if (user) {
          // Vérifier l'existence de l'utilisateur avant de vérifier l'ID
          if (!rest.userId || user.id === rest.userId) {
            return element;
          } else {
            // Rediriger vers la page de connexion si l'ID ne correspond pas
            navigate("/login", { state: { from: location } });
            return null;
          }
        } else {
          // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
          navigate("/login", { state: { from: location } });
          return null;
        }
      }}
    />
  );
}

export default PrivateRoute;
