import { useState, useEffect } from "react";
import CircleX from "../svg/circleX";

const BtnDeleteCategories = ({ categoriesId, onSuccesDelete }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/categories/delete/${categoriesId}`,
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

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-r-xl bg-[#FF3B30] h-full w-10"
        onClick={() => setButtonClicked(true)}
      >
        <span className="p-2 rounded">
          <CircleX className={"w-7 h-7"} stroke={"#0e1217"} />
        </span>
      </button>
    </>
  );
};

export default BtnDeleteCategories;
