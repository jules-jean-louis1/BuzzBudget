import FormAddTransaction from "../form/formAddTransaction";
import CloseSvg from "../svg/closeSvg";
const ModalAddTransaction = ({ onDataSuccess, onClose }) => {
  return (
    <>
      <div className="fixed w-screen h-screen left-0 top-0 bg-[#edf0f7]">
        <div className="modal-content h-full p-2 overflow-auto">
          <div className="flex justify-between items-center my-4">
            <h2 className="text-2xl font-bold text-[#0E1217] py-2">
              Ajouter une transaction
            </h2>
            <button onClick={onClose} className="p-2 bg-[#E0E4EC] rounded-xl">
              <CloseSvg
                className={"w-7 h-7 pointer-events-none"}
                fill={"#0E1217"}
              />
            </button>
          </div>
          <FormAddTransaction onDataSuccess={onDataSuccess} />
        </div>
      </div>
    </>
  );
};

export default ModalAddTransaction;
