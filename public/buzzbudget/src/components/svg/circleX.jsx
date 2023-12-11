const CircleX = ({ className, stroke }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke={stroke}
        fill="none"
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
        <path d="M10 10l4 4m0 -4l-4 4" />
      </svg>
    </>
  );
};

export default CircleX;
