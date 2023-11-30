const AsideMenu = ({ menuBtn }) => {
  console.log(menuBtn);
  return (
    <>
      <aside
        className={
          menuBtn
            ? "block h-full top-14 w-64 bg-white z-30 border-r border-[#52586633] fixed left-0 transition-all duration-300 ease-in-out"
            : "hidden"
        }
      ></aside>
    </>
  );
};

export default AsideMenu;
