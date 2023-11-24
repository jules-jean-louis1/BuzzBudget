import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user_data");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  return { user };
}

export default useAuth;
