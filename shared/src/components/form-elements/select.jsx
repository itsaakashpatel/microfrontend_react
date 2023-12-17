import React from "react";

function Select({ id, name, label, value, onChange, options = [] }) {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-600 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  );
}

export default Select;
