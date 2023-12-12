import { useState } from "react";

const GenericInput = ({ label, type, name, id, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col pt-1 w-full relative">
      <label
        htmlFor={id}
        className={`text-[#525866] absolute transition-all ${
          isFocused || rest.value ? "text-sm top-0" : "opacity-0"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-[#e0e4ec] rounded-xl p-3 text-black text-xl outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "" : label}
        {...rest}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default GenericInput;
