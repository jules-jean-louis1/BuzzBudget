import { useState } from "react";
import ModalCategories from "../modal/modalCategories";
import CategorySvg from "../svg/categorySvg";

const BtnCategories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#ced1da]"
      >
        <span>Catégories</span>
        <span className="p-2 rounded-full bg-black">
          <CategorySvg stroke={"#FFFFFF"} />
        </span>
      </button>
      {modalOpen && <ModalCategories onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default BtnCategories;
