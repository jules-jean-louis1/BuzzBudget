// useAuth.jsx
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function useAuth() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    return new Promise((resolve) => {
      const token = localStorage.getItem("user_data");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        resolve(decodedToken);
      } else {
        resolve(null);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, getUser };
}

export default useAuth;
