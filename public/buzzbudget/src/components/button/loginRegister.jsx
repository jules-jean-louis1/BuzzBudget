import { useState } from "react";
import ModalLogin from "../modal/modalLogin";

export default function LoginRegister() {
  const [modalOpen, setModalOpen] = useState(false);
  const [successLogin, setSuccessLoginM] = useState(false);

  const handleSuccessLogin = (success) => {
    setSuccessLoginM(success);
    if (successLogin) {
      setModalOpen(false);
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
