import GenericInput from "./input/genericInput";
import { useState, useEffect, useRef } from "react";
import PasswordInput from "./input/passwordInput";

const LoginForm = ({ onDataSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/auth/login",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const user_token = data.success;
        localStorage.setItem("user_data", user_token.token);
        onDataSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <form
      ref={formRef}
      action=""
      method="POST"
      className="px-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <div className="border-2 border-b-0 border-[#4A4A4A] rounded-t-xl flex items-center justify-between px-2">
          <div className="flex flex-col pt-1 w-full">
            <GenericInput
              label={"E-mail"}
              type={"email"}
              name={"email"}
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_335)">
                <path
                  d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z"
                  stroke="#8E8E92"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7L12 13L21 7"
                  stroke="#8E8E92"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_335">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-col bg-[#4A4A4A] rounded-b-xl">
          <div className="bg-[#0E1217] border-2 border-[#4A4A4A] rounded-b-xl flex items-center justify-between px-2">
            <PasswordInput
              label="Mot de passe"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="h-20">
            <button className="w-full">
              <p className="text-[#8E8E92] text-center">
                Mot de passe oublié ?
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="pt-14">
        <button
          type="submit"
          style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
          className="flex items-center justify-between w-full rounded-2xl h-16 px-3"
        >
          <span className="text-2xl">Connexion</span>
          <span className="bg-[#0E1217] rounded-full p-3 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5_232)">
                <path
                  d="M1 12L19 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 20L20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3L20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_232">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
