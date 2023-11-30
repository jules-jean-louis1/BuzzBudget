import BtnLogout from "../button/btnLogout";
import LoginRegister from "../button/loginRegister";
import { jwtDecode } from "jwt-decode";
import FooterMobile from "./footerMobile";

function Header() {
  const storedUser = localStorage.getItem("user_data");
  const decoded = storedUser ? jwtDecode(storedUser) : null;
  const user = decoded ? decoded : null;
  return (
    <>
      <header>
        <nav id="mobile" className="block md:hidden fixed top-0 w-full">
          <div className="flex items-center justify-between">
            <div>
              {user ? (
                <div>
                  <p>Hello {decoded.firstname}</p>
                  <BtnLogout />
                </div>
              ) : (
                <p>Not connected</p>
              )}
            </div>
            <div>
              <h1>BuzzBudget</h1>
            </div>
            <div>
              <ul className="flex items-center">
                <li>
                  <LoginRegister />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="block md:hidden">
        <FooterMobile />
      </div>
    </>
  );
}

export default Header;
