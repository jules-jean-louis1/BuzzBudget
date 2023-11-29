import { useState } from "react";
import ModalCategories from "../modal/modalCategories";

const BtnCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#3e3e3e]"
      >
        Catégories
      </button>
      {modalOpen && <ModalCategories onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnCategories;
