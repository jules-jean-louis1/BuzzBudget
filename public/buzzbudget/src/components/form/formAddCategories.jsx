// FormAddCategories.jsx
import GenericInput from "./input/genericInput";
import { useState, useRef, useEffect } from "react";

function FormAddCategories({ onSuccessChange }) {
  const [categories, setCategories] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/categories/add",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        onSuccessChange(true);
        setError("");
        setCategories("");
      } else if (data.categories) {
        setError(data.categories);
        onSuccessChange(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <div>
      <form ref={formRef} action="" method="post" onSubmit={handleSubmit}>
        <div className="border rounded-2xl border-gray-500 onfocus:border-black m-2">
          <GenericInput
            label={"Nom de la catégorie"}
            type={"text"}
            name={"categories"}
            id={"categories"}
            value={categories}
            error={error}
            onChange={(e) => setCategories(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
          className="w-full rounded-xl border p-3 text-slate-50 font-semibold text-xl mt-2"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
export default FormAddCategories;
