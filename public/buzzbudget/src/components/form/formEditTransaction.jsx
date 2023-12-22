import { useState, useEffect, useRef } from "react";
import EditCircle from "../svg/editCircle";
import { useValidateSuccess } from "../hook/useValidateSuccess";
import GenericInput from "./input/genericInput";

const FormEditTransaction = ({ transactionId }) => {
  const { setSuccess } = useValidateSuccess();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [dataTransaction, setDataTransaction] = useState({});

  const getDataFormTransaction = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/transaction/getOne/${transactionId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setDataTransaction(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setSuccess(true);
  };

  useEffect(() => {
    getDataFormTransaction();
  }, []);

  return (
    <>
      <form action="" method="post">
        <div>
          <GenericInput />
        </div>
        <button onClick={handleSubmit} type="submit" id="EditTransaction">
          <span className="text-xl text-black">Modifier</span>
          <span>
            <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
          </span>
        </button>
      </form>
    </>
  );
};

export default FormEditTransaction;
