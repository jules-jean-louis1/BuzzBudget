import CloseSvg from "../svg/closeSvg";
import { useState, useEffect, useRef } from "react";
import GenericInput from "../form/input/genericInput";
import EditCircle from "../svg/editCircle";

const ModalEditTags = ({ onClose, tagsId, valueTags, onSuccessEdit }) => {
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [tags, setTags] = useState(valueTags);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/tags/edit/${tagsId}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        onClose();
        onSuccessEdit(true);
      } else if (data.tags) {
        setError(data.tags);
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
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "#e950373d" }}
    >
      <div className="modal-content h-1/3 w-[95%] bg-[#edf0f7] rounded-2xl border border-[#52586666]">
        <div className="border-b border-[#52586666] flex justify-between items-center py-4 px-4 w-full h-14">
          <h2 className="text-2xl font-bold text-black">Modifier un tags</h2>
          <button type="button" className="px-3 rounded-full" onClick={onClose}>
            <span className="p-2 rounded">
              <CloseSvg
                className={"w-7 h-7 pointer-events-none"}
                fill={"#525866"}
              />
            </span>
          </button>
        </div>
        <div
          id="containerEditTags"
          className="flex flex-col items-center w-full h-full justify-center"
        >
          <form ref={formRef} action="" method="post">
            <div
              id="tagsModifier"
              className="flex items-center px-2 rounded-xl border border-black bg-[#e0e4ec]"
            >
              <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
              <GenericInput
                label={"Tags"}
                type={"text"}
                name={"tags"}
                id={"tags"}
                value={tags}
                error={error}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "linear-gradient(140deg, #FF2E00, #FD9D58)",
              }}
              className="w-full rounded-xl border p-3 text-slate-50 font-semibold text-xl mt-2"
              onClick={handleSubmit}
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTags;
