import { useState, useEffect } from "react";
import CircleX from "../svg/circleX";
const BtnDeleteTransaction = ({ transactionId }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleDeleteTransaction = async () => {
    const response = await fetch(
      `http://localhost:80/buzzbudget/src/transaction/delete/${transactionId}`,
      {
        method: "POST",
        include: "credentials",
      }
    );
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    if (buttonClicked) {
      handleDeleteTransaction();
    }
  }, [buttonClicked]);

  return (
    <>
      <button
        type="button"
        onClick={() => setButtonClicked(true)}
        className="flex items-center justify-center rounded-lg p-2 h-full w-full"
      >
        <span className="text-xl text-black">Supprimer</span>
        <span>
          <CircleX className={"w-7 h-7"} stroke={"#0e1217"} />
        </span>
      </button>
    </>
  );
};

export default BtnDeleteTransaction;
