import React from "react";

function Header({ title = "", subtitle = "" }) {
  return (
    <div class="flex flex-col">
      {title && <h1 class="m-3 font-bold">{title}</h1>}
      {subtitle && <h2 class="m-3 font-bold grayscale-0">{subtitle}</h2>}
    </div>
  );
}

export default Header;
