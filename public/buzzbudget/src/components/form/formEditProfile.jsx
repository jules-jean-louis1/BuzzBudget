import { useState, useEffect, useRef } from "react";
import GenericInput from "./input/genericInput";
import EmailSvg from "../svg/emailSvg";
import UserSvg from "../svg/userSvg";
import PasswordInput from "./input/passwordInput";
import PasswordSvg from "../svg/passwordSvg";

const FormEditProfile = ({ user }) => {
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [errorName, setErrorName] = useState("");

  const [lastname, setLastname] = useState("");
  const [errorLastname, setErrorLastname] = useState("");

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  useEffect(() => {
    if (user && user.user) {
      setFirstname(user.user.firstname || "");
      setLastname(user.user.lastname || "");
      setEmail(user.user.email || "");
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await fetch(
        `http://localhost:80/buzzbudget/src/profil/edit/${user.user.id}`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setErrorName("");
        setErrorLastname("");
        setErrorEmail("");
        setErrorPassword("");
        setErrorPasswordConfirm("");
      } else if (data.firstname) {
        setErrorName(data.firstname);
      } else if (data.lastname) {
        setErrorLastname(data.lastname);
      } else if (data.email) {
        setErrorEmail(data.email);
      } else if (data.password) {
        setErrorPassword(data.password);
      } else if (data.passwordConfirm) {
        setErrorPasswordConfirm(data.passwordConfirm);
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
    <>
      <form ref={formRef} action="" method="post">
        <div className="flex flex-col gap-2 mx-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded-xl bg-[#e0e4ec] px-3">
              <UserSvg className={"w-7 h-7"} stroke={"#0e1217"} />
              <GenericInput
                label="Prénom"
                type="text"
                name="firstname"
                id={"firstname"}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            {errorName && <p className="text-red-500">{errorName}</p>}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded-xl bg-[#e0e4ec] px-3">
              <UserSvg className={"w-7 h-7"} stroke={"#0e1217"} />
              <GenericInput
                label="Nom"
                type="text"
                name="lastname"
                id={"lastname"}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {errorLastname && <p className="text-red-500">{errorLastname}</p>}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded-xl bg-[#e0e4ec] px-3">
              <EmailSvg className={"w-7 h-7"} fill={"#0e1217"} />
              <GenericInput
                label="Email"
                type="email"
                name="email"
                id={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errorEmail && <p className="text-red-500">{errorEmail}</p>}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded-xl bg-[#e0e4ec] px-3">
              <PasswordSvg className={"w-7 h-7"} stroke={"#0e1217"} />
              <PasswordInput
                label="Mot de passe"
                type="password"
                name="password"
                id={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorPassword && <p className="text-red-500">{errorPassword}</p>}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between rounded-xl bg-[#e0e4ec] px-3">
              <PasswordSvg className={"w-7 h-7"} stroke={"#0e1217"} />
              <PasswordInput
                label="Confirmer le mot de passe"
                type="password"
                name="passwordConfirm"
                id={"passwordConfirm"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            {errorPasswordConfirm && (
              <p className="text-red-500">{errorPasswordConfirm}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              style={{
                background: "linear-gradient(140deg, #FF2E00, #FD9D58)",
              }}
              className="w-full rounded-xl border p-3 text-slate-50 font-semibold text-xl mt-2"
              onClick={handleSubmit}
            >
              Modifier
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormEditProfile;
