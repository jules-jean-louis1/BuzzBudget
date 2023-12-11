import FormAddTags from "../form/formAddTags";
import useTags from "../hook/useTags";
import TagsList from "../list/tagsList";
import { useState, useEffect } from "react";
import CloseSvg from "../svg/closeSvg";

function ModalTags({ onClose }) {
  const { tags, reloadTags } = useTags();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSuccessChange = (success) => {
    setSuccess(success);
    messageError();
  };
  const handleDeleteTags = (success) => {
    setSuccess(success);
  };
  const messageError = () => {
    if (success) {
      setError("Le tag a bien été supprimé.");
    } else if (!success) {
      setError("Le tag n'a pas été supprimé.");
    }
  };

  useEffect(() => {
    if (success) {
      reloadTags();
    }
  }, [success]);

  return (
    <>
      <div className="fixed w-screen max-h-[calc(100vh-2.5rem)] h-[40rem] md:max-h-[calc(100vh-5rem)] left-0 bottom-0 bg-[#edf0f7] rounded-t-2xl border border-[#52586666]">
        <div className="modal-content h-full">
          <div className="border-b border-[#52586666] flex justify-between items-center py-4 px-4 w-full h-14">
            <h2 className="text-2xl font-bold text-black">Gérer les tags</h2>
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
          <div className="px-4 pt-4">
            <FormAddTags onSuccessChange={handleSuccessChange} />
            <h3 className="text-xl font-bold text-black">Liste des tags</h3>
            <div id="messageTags">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">Erreur !</strong>
                  <span className="block sm:inline">{error}</span>
                  <span
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setError("")}
                  >
                    <CloseSvg
                      className={"w-5 h-5 pointer-events-none"}
                      fill={"#525866"}
                    />
                  </span>
                </div>
              )}
            </div>
            <TagsList tags={tags} onSuccesDelete={handleDeleteTags} />
          </div>
        </div>
      </div>
    </>
  );
}
export default ModalTags;
