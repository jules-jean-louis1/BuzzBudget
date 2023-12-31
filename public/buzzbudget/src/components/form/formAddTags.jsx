// FormAddTags.jsx
import GenericInput from "./input/genericInput";
import { useState, useRef, useEffect } from "react";

function FormAddTags({ onSuccessChange }) {
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/tags/add",
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
        setTags("");
      } else if (data.tags) {
        setError(data.tags);
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
    <>
      <form ref={formRef} action="" method="post" onSubmit={handleSubmit}>
        <GenericInput
          label={"Nom du tags"}
          type={"text"}
          name={"tags"}
          id={"tags"}
          value={tags}
          error={error}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
          className="w-full rounded-xl border p-3 text-slate-50 font-semibold text-xl mt-2"
        >
          Ajouter
        </button>
      </form>
    </>
  );
}
export default FormAddTags;
