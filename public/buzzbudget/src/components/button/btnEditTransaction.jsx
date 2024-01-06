import { useState, useEffect } from "react";
import EditCircle from "../svg/editCircle";
import ModalEditTransaction from "../modal/modalEditTransaction";
import { useValidateSuccess } from "../hook/useValidateSuccess";

const BtnEditTransaction = ({ transactionId }) => {
  const { success } = useValidateSuccess();
  const [modal, setModal] = useState(false);

  const handleClic = () => {
    setModal(true);
  };

  useEffect(() => {
    if (success) {
      setModal(false);
    }
  }, [success]);

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
