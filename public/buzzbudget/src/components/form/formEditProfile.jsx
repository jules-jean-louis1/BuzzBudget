import { useState, useEffect, useRef } from "react";
import GenericInput from "./input/genericInput";

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

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  return (
    <>
      <form ref={formRef} action="" method="post">
        <div>
          <div>
            <GenericInput
              label="Prénom"
              type="text"
              name="firstname"
              id={"firstname"}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <GenericInput
              label="Nom"
              type="text"
              name="lastname"
              id={"lastname"}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <GenericInput
              label="Email"
              type="email"
              name="email"
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <GenericInput
              label="Mot de passe"
              type="password"
              name="password"
              id={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <GenericInput
              label="Confirmer le mot de passe"
              type="password"
              name="passwordConfirm"
              id={"passwordConfirm"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              className="bg-[#e95037] text-white rounded-xl px-4 py-2"
              onClick={() => setButtonClicked(true)}
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
