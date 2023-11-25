import { useState } from "react";
import ModalCategories from "../modal/modalCategories";

function BtnHandleCategories() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button className="{}" onClick={() => setModalOpen(true)}>
        Ajouter un opération
      </button>
      {modalOpen && <ModalCategories onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default BtnHandleCategories;
