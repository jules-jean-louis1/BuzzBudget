import { useEffect, useState } from "react";

function BtnLogout() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const logoutSession = async () => {
    try {
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/auth/logout"
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.removeItem("user_data");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      logoutSession();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  const handleLogout = () => {
    setButtonClicked(true);
  };
  return (
    <>
      <button onClick={handleLogout}>Déconnexion</button>
    </>
  );
}

export default BtnLogout;
