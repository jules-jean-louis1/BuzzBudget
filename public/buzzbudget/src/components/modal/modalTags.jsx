import FormAddTags from "../form/formAddTags";
import useTags from "../hook/useTags";
import TagsList from "../list/tagsList";
import { useState, useEffect } from "react";
import CloseSvg from "../svg/closeSvg";

function ModalTags({ onClose }) {
  const { tags, reloadTags } = useTags();
  const [success, setSuccess] = useState(false);

  const handleSuccessChange = (success) => {
    setSuccess(success);
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
            <TagsList tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
}
export default ModalTags;
