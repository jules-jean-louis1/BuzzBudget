// useAuth.jsx
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    setUser(storedUser ? jwtDecode(storedUser) : null);
  }, []);

  return { user };
}

export default useAuth;
