import { useState } from "react";
import ModalCategories from "../modal/modalCategories";

const BtnCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>Catégories</button>
      {modalOpen && <ModalCategories onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnCategories;
