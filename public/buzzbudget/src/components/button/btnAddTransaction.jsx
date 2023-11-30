import { useState } from "react";
import ModalAddTransaction from "../modal/modalAddTransaction";
import CirclePlus from "../svg/circlePlus";

const BtnAddTransaction = ({ onDataSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);

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
          onDataSuccess={onDataSuccess}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default BtnAddTransaction;
