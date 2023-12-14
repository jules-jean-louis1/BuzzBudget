import { useState, useEffect } from "react";

const UseUser = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:80/buzzbudget/src/profil/get",
          { method: "GET", credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("A problem occurred when fetching the data: ", error);
      }
    };
    getUser();
  }, []);

  return { user };
};

export default UseUser;
