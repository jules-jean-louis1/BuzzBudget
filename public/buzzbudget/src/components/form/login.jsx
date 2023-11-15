import { useState, useEffect } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const Login = () => {
    const [display, setDisplay] = useState(false);
    const [text, setText] = useState('');
    const [message_display, setMessage_display] = useState('');

    useEffect(() => {
        setText(display ? 'Connexion' : 'Inscription');
        setMessage_display(display ? 'Déja inscrit ?' : 'Pas encore inscrit ?');
    }, [display]);

    return (
        <div>
            <div>   
                {!display && <div>
                    <LoginForm />
                </div>}
                {display && <div>
                    <RegisterForm />
                </div>}
            </div>
            <div className="flex items-center justify-around">
                <p>{message_display}</p>
                <button onClick={()=>{setDisplay(!display)}}>{text}</button>
            </div>
        </div>
    );
};

export default Login;