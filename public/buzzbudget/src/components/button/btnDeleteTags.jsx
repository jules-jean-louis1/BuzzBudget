import CircleX from "../svg/circleX";
import { useState, useEffect } from "react";

const BtnDeleteTags = ({ tagsId, onSuccesDelete }) => {
  const [button, setButton] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/tags/delete/${tagsId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        onSuccesDelete(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleClic = (e) => {
    e.preventDefault();
    setButton(true);
  };

  useEffect(() => {
    if (button) {
      fetchData();
    }
  }, [button]);
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-r-xl bg-[#FF3B30] h-full w-10"
        value={tagsId}
        onClick={handleClic}
      >
        <CircleX className={"w-7 h-7"} stroke={"#0e1217"} />
      </button>
    </>
  );
};

export default BtnDeleteTags;
