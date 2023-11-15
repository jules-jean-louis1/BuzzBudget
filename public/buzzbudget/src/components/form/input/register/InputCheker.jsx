import { useState, useEffect } from 'react';

const InputCheker = (type, name, placeholder, value) => {
    const [input, setInput] = useState('');
    const [valid, setValid] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            const response = await fetch('http://localhost:80/finance-flow/src/auth/register/checkEmail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ input }),
            });
            const data = await response.json();
            setValid(data.isLoggedIn);
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
    
        checkLoginStatus();
      }, [input]);

      const handleInputChange = (event) => {
        setInput(event.target.value);
      };
    return (
        <div>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                value={value} 
                onChange={handleInputChange} />
                {valid ? <p>User is logged in.</p> : <p>User is not logged in.</p>}
        </div>
    )
};

export default InputCheker;

