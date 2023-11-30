import { useState } from "react";
import ModalAddTransaction from "../modal/modalAddTransaction";
import CirclePlus from "../svg/circlePlus";

const BtnAddTransaction = ({ onSuccessChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataSuccess, setDataSuccess] = useState(false);

  const handleDataSuccessChange = (success) => {
    setDataSuccess(success);
    onSuccessChange(success);
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16"
        style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
      >
        <span className="text-xl text-[#f8f8f8]">Ajouter Dépense/Revenu</span>
        <span className="bg-[#f8f8f8] rounded-full p-3 text-white">
          <CirclePlus stroke={"#222222"} fill={"none"} />
        </span>
      </button>
      {modalOpen && (
        <ModalAddTransaction
          onDataSuccessToParent={handleDataSuccessChange}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default BtnAddTransaction;
