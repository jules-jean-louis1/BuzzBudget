import { useState, useEffect } from "react";
import ModalLogin from "../modal/modalLogin";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginSvg from "../svg/loginSvg";

export default function LoginRegister({ successLogin, className, textColor }) {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const storedUser = localStorage.getItem("user_data");
  const [user, setUser] = useState(storedUser ? jwtDecode(storedUser) : null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    setUser(storedUser ? jwtDecode(storedUser) : null);
  }, [success]);

  const handleSuccessLogin = (success) => {
    if (success) {
      setModalOpen(false);
      successLogin(true);
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/account/${user.id}`);
    }
  }, [user]);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={
          className
            ? className
            : "border border-[#5258661f] flex-row justify-center items-center rounded-xl py-3 bg-slate-50 hover:bg-[#5258661f] w-full font-semibold"
        }
      >
        <span className={textColor ? textColor : "text-black"}>Connexion</span>
        <span>
          <LoginSvg />
        </span>
      </button>
      {modalOpen && (
        <ModalLogin
          onClose={() => setModalOpen(false)}
          successLogin={handleSuccessLogin}
        />
      )}
    </>
  );
}
