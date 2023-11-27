import { useState } from "react";
import ModalTags from "../modal/modalTags.jsx";

const BtnCategories = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <button onClick={() => setModalOpen(true)}>Catégories</button>
            {modalOpen && <ModalTags onClose={() => setModalOpen(false)} />}
        </>
    );
};

export default BtnCategories;
