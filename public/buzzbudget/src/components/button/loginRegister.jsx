import { useState } from "react";
import ModalLogin from "../modal/modalLogin";

export default function LoginRegister() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Connexion</button>
            {modalOpen && <ModalLogin onClose={() => setModalOpen(false)} />}
        </>
    )
}