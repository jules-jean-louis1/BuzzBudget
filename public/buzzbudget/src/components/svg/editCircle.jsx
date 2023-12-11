const EditCircle = ({ className, stroke }) => {
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
        <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" />
        <path d="M16 5l3 3" />
        <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6" />
      </svg>
    </>
  );
};

export default EditCircle;
