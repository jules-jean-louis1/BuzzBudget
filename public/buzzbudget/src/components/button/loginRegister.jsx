import { useState, useEffect } from "react";
import ModalLogin from "../modal/modalLogin";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function LoginRegister({ successLogin }) {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const storedUser = localStorage.getItem("user_data");
  const [user, setUser] = useState(storedUser ? jwtDecode(storedUser) : null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    setUser(storedUser ? jwtDecode(storedUser) : null);
  }, [success]);

  console.log(user);
  const handleSuccessLogin = (success) => {
    if (success) {
      setModalOpen(false);
      successLogin(true);
      setSuccess(true);
      navigate(`/account/${user.id}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="border border-[#5258661f] flex-row justify-center items-center rounded-xl py-3 bg-slate-50 hover:bg-[#5258661f] w-full font-semibold"
      >
        Connexion
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
