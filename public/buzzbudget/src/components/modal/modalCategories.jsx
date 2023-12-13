import FormAddCategories from "../form/formAddCategories";
import useCategories from "../hook/useCategories";
import { useState, useEffect } from "react";
import CategoriesList from "../list/categoriesList";
import CloseSvg from "../svg/closeSvg";

function ModalCategories({ onClose }) {
  const { categories, reload } = useCategories();
  const [success, setSuccess] = useState(false);

  const handleSuccessChange = (success) => {
    setSuccess(success);
  };
  useEffect(() => {
    if (success) {
      reload();
    }
  }, [success]);

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: "#e950373d" }}
        id="background_tags"
      >
        <div className="fixed w-screen max-h-[calc(100vh-2.5rem)] h-[40rem] md:max-h-[calc(100vh-5rem)] left-0 bottom-0 bg-[#edf0f7] rounded-t-2xl border border-[#52586666]">
          <div className="modal-content h-full">
            <div className="border-b border-[#52586666] flex justify-between items-center py-4 px-4 w-full h-14">
              <h2 className="text-2xl font-bold text-black">
                Gérer les Catégories
              </h2>
              <button
                type="button"
                className="px-3 rounded-full"
                onClick={onClose}
              >
                <span className="p-2 rounded">
                  <CloseSvg
                    className={"w-7 h-7 pointer-events-none"}
                    fill={"#525866"}
                  />
                </span>
              </button>
            </div>
            <FormAddCategories onSuccessChange={handleSuccessChange} />
            <CategoriesList categories={categories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalCategories;
