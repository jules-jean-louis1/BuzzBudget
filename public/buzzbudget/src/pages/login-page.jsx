import { useEffect, useRef, useState } from "react";

function LoginPage() {
    const formRef = useRef();
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchData = async () => {
        try {
            const formData = new FormData(formRef.current);
            const response = await fetch('http://localhost:80/buzzbudget/src/auth/login', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonClicked(true);
    }
    useEffect(() => {
        if (buttonClicked) {
            fetchData();
            setButtonClicked(false);
        }
    }, [buttonClicked]);
    
    return (
        <>
            <div id="container-Login">
                <h1>Connexion</h1>
                <div>
                    <form action="" method="post" onSubmit={handleSubmit}>
                        <label htmlFor="email">Adresse email</label>
                        <input type="text" name="email" id="email" placeholder="Adresse email" />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage;