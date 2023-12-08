import { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const Login = ({ successLogin }) => {
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [message_display, setMessage_display] = useState("");
  const [messageFromServer, setMessageFromServer] = useState(null);

  useEffect(() => {
    setText(display ? "Connexion" : "Inscription");
    setMessage_display(display ? "Déja inscrit ?" : "Pas encore inscrit ?");
  }, [display]);

  const handleRegistrationSuccess = (message) => {
    setMessageFromServer(message);
    setDisplay(true);
  };

  return (
    <div>
      <div>
        {!display && (
          <div>
            <div className="px-3">
              <h1 className="text-2xl text-white">Connexion</h1>
            </div>
            <LoginForm successLogin={successLogin} />
          </div>
        )}
        {display && (
          <div>
            <div className="px-3">
              <h1 className="text-2xl text-white">Inscription</h1>
            </div>
            <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-around text-white">
        <p>{message_display}</p>
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
