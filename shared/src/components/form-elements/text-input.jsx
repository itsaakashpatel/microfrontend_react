import React from "react";

function TextInput({ id, name, label, value, onChange }) {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-600 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
    </>
  );
}

export default TextInput;
