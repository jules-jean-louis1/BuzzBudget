const EmailSvg = ({ className, fill }) => {
  return (
    <>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M20.25 13.375a3.125 3.125 0 01-5.723 1.738A4 4 0 017.5 12.5v-1a4 4 0 016.501-3.122L14 8.25a.75.75 0 011.493-.102l.007.102v5.125a1.625 1.625 0 003.244.14l.006-.14V9.75a5.25 5.25 0 00-5.034-5.246L13.5 4.5h-3a5.25 5.25 0 00-5.246 5.034l-.004.216v4.5a5.25 5.25 0 005.034 5.246l.216.004h3a.75.75 0 01.102 1.493L13.5 21h-3a6.75 6.75 0 01-6.746-6.513l-.004-.237v-4.5a6.75 6.75 0 016.513-6.746L10.5 3h3a6.75 6.75 0 016.746 6.513l.004.237v3.625zM11.5 9A2.5 2.5 0 009 11.5v1a2.5 2.5 0 105 0v-1A2.5 2.5 0 0011.5 9z"
          fill={fill}
          fillRule="evenodd"
        ></path>
      </svg>
    </>
  );
};

export default EmailSvg;
