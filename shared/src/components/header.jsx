import React from "react";

function Header({ title = "", subtitle = "" }) {
  return (
    <div className="flex flex-col">
      {title && <h1 className="my-3 text-2xl font-bold">{title}</h1>}
      {subtitle && <h2 className="mb-3 text-base text-gray-400">{subtitle}</h2>}
      {(title || subtitle) && <hr className="border-gray-300 my-3" />}
    </div>
  );
}

export default Header;
