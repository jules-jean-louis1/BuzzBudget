import { useEffect, useRef, useState } from "react";
import GenericInput from "./input/genericInput";
import PasswordInput from "./input/passwordInput";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [money, setMoney] = useState("");
  const formRef = useRef();
  const [buttonClicked, setButtonClicked] = useState(false);

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
        <div className="bg-[#0E1217] border-2 border-[#4A4A4A] rounded-t-xl flex items-center justify-between p-2">
          <GenericInput
            label={"Prénom"}
            type={"text"}
            name={"firstname"}
            id={"firstname"}
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="bg-[#0E1217] border-x-2 border-[#4A4A4A] flex items-center justify-between p-2">
          <GenericInput
            label={"Nom"}
            type={"text"}
            name={"lastname"}
            id={"lastname"}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="bg-[#0E1217] border-x-2 border-t-2 border-[#4A4A4A] flex items-center justify-between p-2">
          <PasswordInput
            label="Mot de passe"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="bg-[#0E1217] border-x-2 border-t-2 border-[#4A4A4A] flex items-center justify-between p-2">
          <PasswordInput
            label="Confirmer le mot de passe"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="bg-[#0E1217] border-x-2 border-t-2 border-[#4A4A4A] rounded-b-xl flex items-center justify-between p-2">
          <GenericInput
            label="Ajouter un solde de départ"
            type="number"
            name="money"
            id="money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div>
          <input type="hidden" name="terms" value="0" />
          <input type="checkbox" name="terms" id="terms" value="1" />
          <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
        </div>
        <div>
          <button type="submit" className="p-3 bg-green-300">
            Inscription
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
