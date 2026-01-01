import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ label, value, onChange, placeholder, name, isPassword = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-black">{label}</label>
      <div className="relative w-full">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-3 rounded-xl w-full text-gray-900 placeholder-gray-800 pr-10"
        />

        {isPassword && (
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
