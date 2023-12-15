import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ArrowRightSvg from "../../components/svg/arrow-rightSvg";
import LoginRegister from "../../components/button/loginRegister";

function Homepage() {
  const [user, setUser] = useState(false);
  const [login, setLogin] = useState(false);

  const handleSuccess = (success) => {
    if (success) {
      setLogin(true);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    setUser(storedUser ? jwtDecode(storedUser) : null);
  }, [login]);
  return (
    <>
      <div
        style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
        className="h-screen"
      >
        <div className="px-5 h-full flex flex-col items-stretch justify-between py-32">
          <div id="logo-container" className="flex flex-col space-y-6">
            <svg
              width="88"
              height="48"
              viewBox="0 0 88 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.0568 11.855L20.5284 0L0 11.855V35.565L20.5284 47.4201L41.0568 35.565V26.3846L43.357 25.0566L45.831 26.485H46.0007V35.565L66.5342 47.4201L87.0677 35.565V11.855L66.5342 0L46.0007 11.855V11.8609H45.7555L43.3218 13.266L41.0568 11.9583V11.855ZM20.3242 39.0357C28.3324 39.0357 34.8242 32.312 34.8242 24.0179C34.8242 15.7237 28.3324 9 20.3242 9C12.3161 9 5.82422 15.7237 5.82422 24.0179C5.82422 32.312 12.3161 39.0357 20.3242 39.0357ZM66.3242 38C74.3323 38 80.8242 31.5081 80.8242 23.5C80.8242 15.4919 74.3323 9.00002 66.3242 9.00002C58.3161 9.00002 51.8242 15.4919 51.8242 23.5C51.8242 31.5081 58.3161 38 66.3242 38Z"
                fill="white"
              />
            </svg>
            <div className="w-[90%]">
              <p className="text-2xl text-slate-50">
                Gérez votre budget plus facilement et rapidement que jamais
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="">
              <button
                type="button"
                className="bg-yellow-50 rounded-3xl flex items-center justify-between w-full h-28 px-2"
              >
                {user && user.id && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-xl">Bienvenue {user.firstname}</span>
                    <span className="taxt-xl">Acceder a votre compte</span>
                  </div>
                )}
                {user === null && <span className="text-xl">Commencer</span>}
                <span className="bg-[#0E1217] rounded-full p-3 text-white">
                  <ArrowRightSvg stroke={"#fff"} />
                </span>
              </button>
            </div>
            <div className="bg-[#0E1217] bg-opacity-[25%] rounded-xl">
              <LoginRegister
                successLogin={handleSuccess}
                className={
                  "bg-[#0E1217] flex items-center justify-between w-full px-2 rounded-2xl h-16"
                }
                textColor={"text-white"}
              />
              <div className="flex items-center rounded-xl h-20">
                <div className="flex justify-center items-center">
                  <p className="text-center text-xs text-slate-50">
                    En rejoignant BuzzBudget, vous acceptez nos termes de
                    service et notre politique de confidentialité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
