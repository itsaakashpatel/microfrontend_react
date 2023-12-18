import React from "react";

function Member({ name, role, phone, email }) {
  return (
    <div className="text-xl mx-auto max-w-xl m-3">
      <div className="flex flex-row items-center">
        <img
          src="https://i.pravatar.cc/300"
          alt="avatar"
          className="rounded-full w-32 h-32"
        />
        <div className="flex flex-col mx-5 justify-center">
          <h3 className="text-2xl font-medium leading-tight mb-2">
            {name}
            {role === "admin" && (
              <span className="text-gray-500 text-base mx-3">{`(${role})`}</span>
            )}
          </h3>{" "}
          <p className="text-gray-500 text-base">{phone}</p>
          <p className="text-gray-500 text-base">{email}</p>
        </div>
      </div>
      <hr className="border-gray-300 my-3" />
    </div>
  );
}

export default Member;
