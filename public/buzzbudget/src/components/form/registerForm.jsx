import { useEffect, useRef, useState } from "react";
import GenericInput from "./input/genericInput";
import PasswordInput from "./input/passwordInput";

const RegisterForm = ({ onSuccessRegistration }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [money, setMoney] = useState("");
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorMoney, setErrorMoney] = useState("");
  const [errorTerms, setErrorTerms] = useState("");

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        "http://localhost:80/buzzbudget/src/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        onSuccessRegistration(true);
      }
      if (data.firstname) {
        setErrorFirstname(data.firstname);
      } else {
        setErrorFirstname("");
      }
      if (data.lastname) {
        setErrorLastname(data.lastname);
      } else {
        setErrorLastname("");
      }
      if (data.email) {
        setErrorEmail(data.email);
      } else {
        setErrorEmail("");
      }
      if (data.password) {
        setErrorPassword(data.password);
      } else {
        setErrorPassword("");
      }
      if (data.passwordConfirm) {
        setErrorPasswordConfirm(data.passwordConfirm);
      } else {
        setErrorPasswordConfirm("");
      }
      if (data.money) {
        setErrorMoney(data.money);
      } else {
        setErrorMoney("");
      }
      if (data.terms) {
        setErrorTerms(data.terms);
      } else {
        setErrorTerms("");
      }
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
      }
      if (data.success) {
        setSuccess(data.success);
      } else {
        setSuccess("");
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
    <form ref={formRef} action="" method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col text-white px-2">
        <div className="border-2 border-[#8E8E92] bg-[#e0e4ec] rounded-t-xl">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Prénom"}
              type={"text"}
              name={"firstname"}
              id={"firstname"}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            {errorFirstname && (
              <p className="text-red-500 text-center text-xs">
                {errorFirstname}
              </p>
            )}
          </div>
        </div>
        <div className="border-x-2 border-[#8E8E92] bg-[#e0e4ec]">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Nom"}
              type={"text"}
              name={"lastname"}
              id={"lastname"}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            {errorLastname && (
              <p className="text-red-500 text-center text-xs">
                {errorLastname}
              </p>
            )}
          </div>
        </div>
        <div className="border-x-2 border-t-2 border-[#8E8E92] bg-[#e0e4ec]">
          <div className="flex flex-col w-full">
            <GenericInput
              label={"Adresse email"}
              type={"email"}
              name={"email"}
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && (
              <p className="text-red-500 text-center text-xs">{errorEmail}</p>
            )}
          </div>
        </div>
        <div className="border-x-2 border-t-2 border-[#8E8E92] bg-[#e0e4ec]">
          <div className="flex flex-col w-full">
            <PasswordInput
              label="Mot de passe"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorPassword && (
              <p className="text-red-500 text-center text-xs">
                {errorPassword}
              </p>
            )}
          </div>
        </div>
        <div className="border-2 border-[#8E8E92] bg-[#e0e4ec] border-t-2">
          <div className="flex flex-col w-full">
            <PasswordInput
              label="Confirmer le mot de passe"
              name="passwordConfirm"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {errorPasswordConfirm && (
              <p className="text-red-500 text-center text-xs">
                {errorPasswordConfirm}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="border-b-2 border-x-2 border-[#8E8E92] bg-[#e0e4ec] rounded-b-xl">
            <div className="flex flex-col w-full">
              <GenericInput
                label="Ajouter un solde(optionel)"
                type="number"
                name="money"
                id="money"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
              />
              {errorMoney && (
                <p className="text-red-500 text-center text-xs">{errorMoney}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="bg-[#4A4A4A] rounded-xl h-14 flex items-center justify-center">
              <input type="hidden" name="terms" value="0" />
              <input type="checkbox" name="terms" id="terms" value="1" />
              <label htmlFor="terms">
                J'accepte les conditions d'utilisation
              </label>
            </div>
            {errorTerms && (
              <p className="text-red-500 text-center text-xs">{errorTerms}</p>
            )}
          </div>
        </div>
        <div id="displayError">
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </div>
        <div className="pt-2">
          <button
            type="submit"
            style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
            className="flex items-center justify-between w-full rounded-2xl h-16 px-3"
          >
            <span className="text-2xl">Inscription</span>
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
      </div>
    </form>
  );
};

export default RegisterForm;
