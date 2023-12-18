import React from "react";

function Select({ id, name, onChange, options = [], defaultValue = "" }) {
  return (
    <>
      {options.map((option, index) => (
        <div className="mb-4" key={index}>
          <label className="flex items-center justify-between">
            <span className="ml-2 text-base">{option.label}</span>
            <input
              id={id}
              type="radio"
              name={name}
              value={option ? option.value : "regular"}
              onChange={onChange}
              defaultChecked={option.value === defaultValue}
              className="form-radio text-sm text-blue-500 checked:bg-blue-600 bg-blue-500"
            />
          </label>
          <hr className="border-gray-300 my-3" />
        </div>
      ))}
    </>
  );
}

export default Select;
