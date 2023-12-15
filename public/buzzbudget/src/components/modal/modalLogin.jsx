import Login from "../form/login";
import CloseSvg from "../svg/closeSvg";

export default function ModalLogin({ onClose, successLogin }) {
  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 z-20"
      style={{ backgroundColor: "#e950373d" }}
    >
      <div className="h-full pt-2">
        <div className="modal_login h-[94%] w-[98%] bg-[#edf0f7] rounded-2xl border border-[#52586666]">
          <div className="border-b border-[#52586666] flex justify-between items-center py-4 px-4 w-full h-14">
            <h2 className="text-2xl font-bold">BuzzBudget</h2>
            <span className="close" onClick={onClose}>
              <CloseSvg
                className={"w-7 h-7 pointer-events-none"}
                fill={"#525866"}
              />
            </span>
          </div>
          <Login successLogin={successLogin} />
        </div>
      </div>
    </div>
  );
}
