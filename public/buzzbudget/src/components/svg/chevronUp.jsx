function ChevronUp({ stroke, fill, width, height }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-up"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={stroke}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 15l6 -6l6 6" />
      </svg>
    </>
  );
}
export default ChevronUp;
