import { useState } from "react";
import ModalTags from "../modal/modalTags.jsx";
import TagsSvg from "../svg/tagsSvg.jsx";

const BtnTags = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#ced1da]"
      >
        <span>Tags</span>
        <span className="p-2 rounded-full bg-black">
          <TagsSvg stroke={"#FFFFFF"} />
        </span>
      </button>
      {modalOpen && <ModalTags onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnTags;
