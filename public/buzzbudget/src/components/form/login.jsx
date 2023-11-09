import { useState } from "react";

const Login = () => {
    const [dislpay, setDisplay] = useState(false);
    return (
        <div>
            <div>
                <button onClick={()=>{setDisplay(true)}}>Inscription</button>
                {dislpay && <div>
                    <form action="" method="post">
                        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
                        <input type="password" name="password" id="password" placeholder="Mot de passe" />
                        <input type="password" name="password" id="password" placeholder="Confirmer le mot de passe" />
                        <input type="submit" value="S'inscrire" />
                    </form>
                </div>}
                {!dislpay && <div>
                    <form action="" method="post">
                        <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
                        <input type="password" name="password" id="password" placeholder="Mot de passe" />
                        <input type="submit" value="Se connecter" />
                    </form>
                    </div>
                    }
            </div>
        </div>
    );
};

export default Login;