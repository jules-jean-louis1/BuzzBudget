import { useState } from "react";
import EditCircle from "../svg/editCircle";
import ModalEditCategories from "../modal/modalEditCategories";

const BtnEditCategories = ({
  categoriesId,
  valueCategories,
  onSuccessEdit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center bg-[#8E8E93] h-full w-10"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#editCategories${categoriesId}`}
      >
        <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
      </button>
      {modalOpen && (
        <ModalEditCategories
          onClose={() => setModalOpen(false)}
          categoriesId={categoriesId}
          valueCategories={valueCategories}
          onSuccessEdit={onSuccessEdit}
        />
      )}
    </>
  );
};

export default BtnEditCategories;
