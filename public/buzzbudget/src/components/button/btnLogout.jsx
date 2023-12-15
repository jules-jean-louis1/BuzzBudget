import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BtnLogout({ userStatus }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  let navigate = useNavigate();

  const logoutSession = async () => {
    try {
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/auth/logout"
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.removeItem("user_data");
        userStatus(null);
        navigate("/");
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
      <button
        onClick={handleLogout}
        className="border border-[#5258661f] flex-row justify-center items-center rounded-xl py-3 hover:bg-[#5258661f]"
      >
        <span>Déconnexion</span>
      </button>
    </>
  );
}

export default BtnLogout;
