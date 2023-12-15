import { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const Login = ({ successLogin }) => {
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [message_display, setMessage_display] = useState("");

  useEffect(() => {
    setText(display ? "Connexion" : "Inscription");
    setMessage_display(display ? "Déja inscrit ?" : "Pas encore inscrit ?");
  }, [display]);

  const handleRegistrationSuccess = (success) => {
    if (success) {
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
    } else {
      setDisplay(true);
    }
  };

  return (
    <div>
      <div>
        {!display && (
          // Switch to LoginForm
          <div>
            <div className="p-3">
              <h1 className="text-2xl text-black text-center">Connexion</h1>
            </div>
            <LoginForm successLogin={successLogin} />
          </div>
        )}
        {display && (
          // Switch to RegisterForm
          <div>
            <div className="p-3">
              <h1 className="text-2xl text-black text-center">Inscription</h1>
            </div>
            <RegisterForm onSuccessRegistration={handleRegistrationSuccess} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-around text-black py-2">
        <p className="">{message_display}</p>
        <button
          onClick={() => {
            setDisplay(!display);
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
};

export default Login;
