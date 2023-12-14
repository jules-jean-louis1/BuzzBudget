import { useState } from "react";
import SeePassword from "../../svg/seePassword";

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
          className={`text-[#525866] absolute transition-all ${
            isFocused || rest.value ? "text-sm top-0" : "opacity-0"
          } ${rest.value ? "text-sm top-0" : ""}`}
        >
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          className="bg-[#e0e4ec] rounded-xl p-3 text-black text-xl outline-none"
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
        <SeePassword className={"w-7 h-7"} fill={"#8E8E92"} />
      </button>
    </div>
  );
};

export default PasswordInput;
