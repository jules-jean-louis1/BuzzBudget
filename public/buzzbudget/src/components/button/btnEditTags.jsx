import EditCircle from "../svg/editCircle";

const BtnEditTags = ({ tagsId }) => {
  return (
    <>
      <button
        className="flex items-center justify-center bg-[#8E8E93] h-full w-10"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#editTags${tagsId}`}
      >
        <EditCircle className={"w-7 h-7"} stroke={"#0e1217"} />
      </button>
    </>
  );
};

export default BtnEditTags;
