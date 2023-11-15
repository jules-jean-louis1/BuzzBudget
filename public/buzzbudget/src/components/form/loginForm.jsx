
const LoginForm = () => {

    return (
        <form action="" method="post">
            <input type="text" name="username" id="username" placeholder="Nom d'utilisateur" />
            <input type="password" name="password" id="password" placeholder="Mot de passe" />
            <button type="submit" className="p-3 bg-yellow-100">
                Connexion
            </button>
        </form>
    )
};

export default LoginForm;