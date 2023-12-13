import EditCircle from "../svg/editCircle";
import { useState } from "react";
import ModalEditTags from "../modal/modalEditTags";

const BtnEditTags = ({ tagsId, valueTags, onSuccessEdit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center justify-center bg-[#8E8E93] h-full w-10"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#editTags${tagsId}`}
      >
        <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
      </button>
      {modalOpen && (
        <ModalEditTags
          onClose={() => setModalOpen(false)}
          tagsId={tagsId}
          valueTags={valueTags}
          onSuccessEdit={onSuccessEdit}
        />
      )}
    </>
  );
};

export default BtnEditTags;
