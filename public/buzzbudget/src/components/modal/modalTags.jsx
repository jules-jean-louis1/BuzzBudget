import FormAddTags from "../form/formAddTags";
import useTags from "../hook/useTags";
import TagsList from "../list/tagsList";
import { useState, useEffect } from "react";

function ModalTags({ onClose }) {
  const { tags, reload } = useTags();
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
      <div className="fixed w-screen h-screen left-0 top-0 bg-[#141414]">
        <div className="modal-content h-full">
          <div className="flex justify-between">
            <button
              type="button"
              className="px-3 rounded-full"
              onClick={onClose}
            >
              <span className="close">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 pointer-events-none"
                >
                  <path
                    d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z"
                    fill="#fff"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-gray-50">Tags</h2>
          <FormAddTags onSuccessChange={handleSuccessChange} />
          <TagsList tags={tags} />
        </div>
      </div>
    </>
  );
}
export default ModalTags;
