import { useState, useEffect, useRef } from "react";
import EditCircle from "../svg/editCircle";
import { useValidateSuccess } from "../hook/useValidateSuccess";

const FormEditTransaction = ({ transactionId }) => {
  const { setSuccess } = useValidateSuccess();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    setSuccess(true);
  };
  return (
    <>
      <form action="" method="post">
        <button onClick={handleSubmit} type="submit">
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
