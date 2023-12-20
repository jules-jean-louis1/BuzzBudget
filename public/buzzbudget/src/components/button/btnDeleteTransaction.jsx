import { useState, useEffect } from "react";
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
        className="flex items-center justify-between px-2 rounded-xl w-full min-h-16 h-16 bg-[#FFFFFF] border border-[#5258661f]"
      >
        <span className="text-xl text-black">Supprimer</span>
      </button>
    </>
  );
};

export default BtnDeleteTransaction;
