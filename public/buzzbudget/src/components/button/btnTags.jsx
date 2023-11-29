import { useState } from "react";
import ModalTags from "../modal/modalTags.jsx";

const BtnTags = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#3e3e3e]"
      >
        Tags
      </button>
      {modalOpen && <ModalTags onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnTags;
