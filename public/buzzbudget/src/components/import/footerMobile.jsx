import { useRef } from "react";
import { jwtDecode } from "jwt-decode";
import HomeSvg from "../svg/homeSvg";
import { Link } from "react-router-dom";
import PigMoneySvg from "../svg/pig-moneySvg";
import HistorySvg from "../svg/historySvg";

const FooterMobile = () => {
  const storedUser = localStorage.getItem("user_data");
  const user = useRef(storedUser ? jwtDecode(storedUser) : null);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full h-12 min-h-[48px] bg-[#FFFFFF] border-t border-[#52586633]">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-md">
            <HomeSvg
              stroke={"#2d313a"}
              className={"w-7 h-7 pointer-events-none"}
            />
          </Link>
          <Link
            to={`/account/${user.current.id}`}
            className="p-2 hover:bg-slate-100 rounded-md"
          >
            <PigMoneySvg
              stroke={"#2d313a"}
              className={"w-7 h-7 pointer-events-none"}
            />
          </Link>
          <Link
            to={`/account/history/${user.current.id}`}
            className="p-2 hover:bg-slate-100 rounded-md"
          >
            <HistorySvg
              className={"w-7 h-7 pointer-events-none"}
              stroke={"#2d313a"}
              fill={"none"}
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default FooterMobile;
