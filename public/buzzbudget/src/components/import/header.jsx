import LoginRegister from "../button/loginRegister";
import { jwtDecode } from "jwt-decode";

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
              {user ? <p>Hello {decoded.firstname}</p> : <p>Not connected</p>}
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
    </>
  );
}

export default Header;
