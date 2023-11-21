import { useState } from "react";

const PasswordInput = ({ label, name, id, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-between items-center pt-1 w-full relative">
      <div className="w-[80%]">
        <label
          htmlFor={id}
          className={`text-[#8E8E92] absolute transition-all ${
            isFocused || rest.value ? "text-sm top-0" : "opacity-0"
          } ${rest.value ? "text-sm top-0" : ""}`}
        >
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          className="bg-[#0E1217] w-full p-3 text-white text-xl outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused || rest.value ? "" : label}
          {...rest}
        />
      </div>
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-lock"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#8E8E92"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <link
            xmlns=""
            type="text/css"
            rel="stylesheet"
            id="dark-mode-custom-link"
          />
          <link
            xmlns=""
            type="text/css"
            rel="stylesheet"
            id="dark-mode-general-link"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-custom-style"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-native-style"
          />
          <style
            xmlns=""
            lang="en"
            type="text/css"
            id="dark-mode-native-sheet"
          />
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
          <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
          <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
        </svg>
      </button>
    </div>
  );
};

export default PasswordInput;
