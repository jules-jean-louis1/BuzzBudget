function GenericAddBtn({ text }) {
  return (
    <button
      type="submit"
      style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
      className="flex items-center justify-between w-full rounded-2xl h-16 px-3"
    >
      <span className="text-2xl">{text}</span>
      <span className="bg-[#0E1217] rounded-full p-3 text-white">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_5_232)">
            <path
              d="M1 12L19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 20L20 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 3L20 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_5_232">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </button>
  );
}

export default GenericAddBtn;
