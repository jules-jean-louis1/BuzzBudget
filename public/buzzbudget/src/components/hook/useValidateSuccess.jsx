import { createContext, useContext, useState } from "react";

const ValidateSuccess = createContext();

export const useValidateSuccess = () => {
  return useContext(ValidateSuccess);
};

export const ValidateSuccessProvider = ({ children }) => {
  const [success, setSuccess] = useState(false);

  return (
    <ValidateSuccess.Provider value={{ success, setSuccess }}>
      {children}
    </ValidateSuccess.Provider>
  );
};
