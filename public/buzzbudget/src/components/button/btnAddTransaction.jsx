import { useState } from "react";
import ModalAddTransaction from "../modal/modalAddTransaction";

const BtnAddTransaction = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>Ajouter un opération</button>
      {modalOpen && <ModalAddTransaction onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnAddTransaction;
