const CirclePlus = ({ stroke, fill }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-circle-plus"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={stroke}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <link
          xmlns=""
          type="text/css"
          rel="stylesheet"
          id="dark-mode-custom-link"
        />
        <link
          xmlns=""
          type="text/css"
          rel="stylesheet"
          id="dark-mode-general-link"
        />
        <style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style" />
        <style xmlns="" lang="en" type="text/css" id="dark-mode-native-style" />
        <style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet" />
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 12l6 0" />
        <path d="M12 9l0 6" />
      </svg>
    </>
  );
};

export default CirclePlus;
