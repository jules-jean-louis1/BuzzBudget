import { useState } from "react";
import ModalTags from "../modal/modalTags.jsx";

const BtnTags = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>Tags</button>
      {modalOpen && <ModalTags onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnTags;
