import React from "react";

function Button({ title }) {
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
    >
      {title}
    </button>
  );
}

export default Button;
