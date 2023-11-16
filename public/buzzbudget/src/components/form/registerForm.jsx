import { useEffect, useRef, useState } from "react";

const RegisterForm = () => {
    const formRef = useRef();
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchData = async () => {
        try {
            const formData = new FormData(formRef.current);
            const response = await fetch('http://localhost:80/buzzbudget/src/auth/register', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

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
            <div className="flex items-center justify-between">
                <input type="text" name="firstname" id="firstname" placeholder="Prénom" />
                <input type="text" name="lastname" id="lastname" placeholder="Nom" />
            </div>
            <div className="flex items-center justify-between">
                <input type="text" name="email" id="email" placeholder="Adresse email" />
            </div>
            <div className="flex flex-col space-y-2">
                <input type="password" name="password" id="password" placeholder="Mot de passe" />
                <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" />
            </div>
            <div>              
                <label htmlFor="money">Ajouter un solde de départ</label>
                <input type="number" name="money" id="money" placeholder="Budget" step='0.01' />
            </div>
            <div>
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">J'accepte les conditions d'utilisation</label>
            </div>
            <div>
                <button type="submit" className="p-3 bg-green-300">
                    Inscription
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
