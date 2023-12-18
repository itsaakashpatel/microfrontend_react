import React, { useRef } from "react";

function TextInput({ id, name, label, value, onChange, error }) {
  const isEditedRef = useRef(false);

  const handleBlur = () => {
    isEditedRef.current = true;
  };
  return (
    <>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={label}
        className={`w-full text-sm px-4 py-2 my-2 border rounded-md focus:outline-none ${
          isEditedRef.current
            ? "focus:border-blue-500"
            : "focus:border-gray-500"
        }`}
      />
      {error && isEditedRef.current && (
        <p className="my-2 text-red-500 text-xs italic">{error}</p>
      )}
    </>
  );
}

export default TextInput;
