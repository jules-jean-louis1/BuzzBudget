import { useState } from "react";

const GenericInput = ({ label, type, name, id, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col pt-1 w-full relative">
      <label
        htmlFor={id}
        className={`text-[#8E8E92] absolute transition-all ${
          isFocused || rest.value ? "text-sm top-0" : "opacity-0"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? "" : label}
        {...rest}
      />
    </div>
  );
};

export default GenericInput;