import { Link } from "react-router-dom";
import Logout from "../button/btnLogout";
import HomeSvg from "../svg/homeSvg";
import LoginRegister from "../button/loginRegister";
import { useLocation } from "react-router-dom";

const AsideMenu = ({ menuBtn, user }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/" ? true : false;
  return (
    <>
      <aside
        className={
          menuBtn
            ? `block h-full top-14 w-64 z-30 border-r border-[#52586633] fixed left-0 transition-all duration-300 ease-in-out ${
                isHomePage ? "bg-transparent backdrop-blur-lg" : "bg-white"
              }`
            : "hidden"
        }
      >
        <div className="flex overflow-x-hidden overflow-y-auto flex-col h-full no-scrollbar">
          <nav className="my-4 mt-10 xl:mt-8">
            {user && user.id && (
              <>
                <li className="flex flex-col p-6 pt-2">
                  <div className="flex items-center mb-4">
                    <Link
                      to={`/account/${user.id}`}
                      className="flex items-center p-0 ml-0.5 font-bold no-underline rounded-lg border-none cursor-pointer text-theme-label-primary bg-theme-bg-secondary"
                    >
                      <div className="object-cover w-8 h-8 rounded-10 relative overflow-hidden">
                        <img
                          src={`/public/images/avatars/${user.avatar}`}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </Link>
                    <div className="flex-1"></div>
                    <Link to={`/profile/${user.id}`}>
                      <button
                        type="button"
                        className="p-2 rounded-xl hover:bg-[#5258661f]"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 pointer-events-none"
                        >
                          <path
                            d="M12 3a3 3 0 012.758 1.817l.067.171.035.106.04-.02a3.004 3.004 0 013.151.29l.169.137.144.135a3.001 3.001 0 01.645 3.284l-.082.18-.023.039.108.036a3.003 3.003 0 011.964 2.446l.019.203L21 12a3 3 0 01-1.817 2.758l-.171.067-.107.035.021.04a3.004 3.004 0 01-.29 3.151l-.137.169-.135.144a3.001 3.001 0 01-3.284.645l-.18-.082-.04-.023-.035.108a3.003 3.003 0 01-2.446 1.964l-.203.019L12 21a3 3 0 01-2.758-1.817l-.067-.172-.036-.106-.039.021a3.004 3.004 0 01-3.151-.29L5.78 18.5l-.144-.135a3.001 3.001 0 01-.645-3.284l.082-.18.022-.04-.107-.035a3.003 3.003 0 01-1.964-2.446l-.019-.203L3 12a3 3 0 011.817-2.758l.172-.067.105-.036-.02-.039a3.004 3.004 0 01.29-3.151L5.5 5.78l.135-.144a3.001 3.001 0 013.284-.645l.18.082.039.022.036-.107a3.003 3.003 0 012.446-1.964l.203-.019L12 3zm0 1.5a1.5 1.5 0 00-1.493 1.356L10.5 6v1.229c-.188.059-.371.129-.55.209l-.262.127-.87-.868a1.5 1.5 0 00-2.224 2.007l.103.114.868.87c-.09.172-.17.35-.24.534l-.096.279L6 10.5a1.5 1.5 0 00-.144 2.993L6 13.5h1.229c.06.188.129.372.209.55l.127.262-.868.87a1.5 1.5 0 001.06 2.56l.144-.006c.287-.028.567-.138.803-.33l.114-.103.87-.868c.172.09.35.17.534.24l.279.096L10.5 18a1.5 1.5 0 001.356 1.493L12 19.5l.144-.007a1.5 1.5 0 001.35-1.349L13.5 18v-1.229c.188-.06.372-.129.55-.209l.262-.127.87.868c.293.293.677.44 1.06.44l.144-.007a1.5 1.5 0 001.02-2.44l-.103-.114-.868-.87c.09-.172.17-.35.24-.533l.096-.279H18l.144-.007a1.5 1.5 0 000-2.986L18 10.5h-1.229a4.964 4.964 0 00-.209-.55l-.127-.262.868-.87a1.5 1.5 0 00-2.007-2.224l-.114.103-.87.868c-.172-.09-.35-.17-.533-.24L13.5 7.23V6A1.5 1.5 0 0012 4.5zM12 9a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                            fill="currentcolor"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </Link>
                  </div>
                  <strong className="mb-0.5 typo-callout">
                    <span>{user.firstname}</span>
                    <span>{user.lastname}</span>
                  </strong>
                  <Logout />
                </li>
                <ul className="mt-0 xl:mt-4">
                  <li className="hover:bg-[#DCDDE0] px-4">
                    <Link
                      to={`/account/${user.id}`}
                      className="flex w-full h-12"
                    >
                      <button className="flex flex-row items-center justify-between w-full">
                        <span className="text-lg text-[#525866]">
                          <HomeSvg className={"w-7 h-7"} stroke={"#525866"} />
                        </span>
                        <span className="text-lg text-[#525866]">Accueil</span>
                      </button>
                    </Link>
                  </li>
                  <li className="hover:bg-[#DCDDE0] px-4">
                    <Link
                      to={`/account/history/${user.id}`}
                      className="flex w-full h-12"
                    >
                      <button className="flex flex-row items-center justify-between w-full">
                        <span className="text-lg text-[#525866]">
                          <HomeSvg className={"w-7 h-7"} stroke={"#525866"} />
                        </span>
                        <span className="text-lg text-[#525866]">
                          Historique
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className="hover:bg-[#DCDDE0] px-4">
                    <Link
                      to={`/profil/${user.id}`}
                      className="flex w-full h-12"
                    >
                      <button className="flex flex-row items-center justify-between w-full">
                        <span className="text-lg text-[#525866]">
                          <HomeSvg className={"w-7 h-7"} stroke={"#525866"} />
                        </span>
                        <span className="text-lg text-[#525866]">Profil</span>
                      </button>
                    </Link>
                  </li>
                </ul>
              </>
            )}
            {user === null && (
              <>
                <li className="flex flex-col p-6 pt-2">
                  <div className="flex items-center mb-4">
                    <LoginRegister />
                  </div>
                </li>
              </>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AsideMenu;
