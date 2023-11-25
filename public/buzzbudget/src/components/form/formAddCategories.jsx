import GenericInput from "./input/genericInput";
import { useState, useRef, useEffect } from "react";

function FormAddCategories() {
  const [name, setName] = useState("");
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
        }
      );
      const data = await response.json();
      console.log(data);
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
      <h1>Add Categories</h1>
      <form ref={formRef} action="" method="post" onClick={handleSubmit}>
        <GenericInput
          label={"Nom de la catégorie"}
          type={"text"}
          name={"name"}
          id={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
}
export default FormAddCategories;
