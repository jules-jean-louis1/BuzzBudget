import CircleX from "../svg/circleX";

const BtnDeleteTags = ({ tagsId }) => {
  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center rounded-r-xl bg-[#FF3B30] h-full w-10"
        value={tagsId}
      >
        <CircleX className={"w-7 h-7"} stroke={"#0e1217"} />
      </button>
    </>
  );
};

export default BtnDeleteTags;
