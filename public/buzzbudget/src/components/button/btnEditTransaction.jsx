import { useState } from "react";
import EditCircle from "../svg/editCircle";
import ModalEditTransaction from "../modal/modalEditTransaction";

const BtnEditTransaction = ({ transactionId }) => {
  const [modal, setModal] = useState(false);

  const handleClic = () => {
    console.log(transactionId);
    setModal(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleClic}
        className="flex items-center justify-center rounded-lg p-2 h-full w-full"
      >
        <span className="text-xl text-black">Modifier</span>
        <span>
          <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
        </span>
      </button>
      {modal && (
        <ModalEditTransaction
          onClose={() => setModal(false)}
          transactionId={transactionId}
        />
      )}
    </>
  );
};

export default BtnEditTransaction;
