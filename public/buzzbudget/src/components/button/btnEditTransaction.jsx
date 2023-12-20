import { useState } from "react";
import EditCircle from "../svg/editCircle";

const BtnEditTransaction = ({ transactionId }) => {
  const [modal, setModal] = useState(false);

  const handleClic = () => {
    setModal(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleClic}
        className="flex items-center justify-center rounded-lg p-2 bg-[#30ff75] h-full w-full"
      >
        <span className="text-xl text-black">Modifier</span>
        <span>
          <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
        </span>
      </button>
    </>
  );
};

export default BtnEditTransaction;
