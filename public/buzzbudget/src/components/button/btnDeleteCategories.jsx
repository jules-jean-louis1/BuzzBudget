import DeleteSvg from "../../assets/svg/deleteSvg";
import { useState, useEffect } from "react";

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
        className="px-3 rounded-full"
        onClick={() => setButtonClicked(true)}
      >
        <span className="p-2 rounded">
          <DeleteSvg
            className={"w-7 h-7 pointer-events-none"}
            fill={"#525866"}
          />
        </span>
      </button>
    </>
  );
};

export default BtnDeleteCategories;
