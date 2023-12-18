import React from "react";

function Button({ title, type, action = "save", onClick }) {
  let buttonClass =
    "my-2 px-8 min-h-5 text-white md:w-auto text-base text-center p-2 rounded inline-flex items-center float-right";

  if (type === "solid") {
    buttonClass += " bg-blue-500 hover:bg-blue-700";
  } else if (type === "outline") {
    buttonClass +=
      " bg-white hover:bg-red-500 text-red-500 hover:text-white border border-gray-200";
  }

  return (
    <button
      type="submit"
      className={buttonClass}
      data-action={action}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
