// EDIT TEAM MEMBER PAGE

import React, { useState, useEffect } from "react";
import Header from "shared/Header";
import Button from "shared/Button";
import TextInput from "shared/Input";
import Select from "shared/Select";
import { useLocation, useNavigate } from "react-router-dom";

function EditTeam() {
  const location = useLocation();
  const navigate = useNavigate();
  const { member } = location.state;
  const [teamMember, setTeamMember] = useState({
    _id: member?._id,
    firstName: member?.firstName,
    lastName: member?.lastName,
    email: member?.email,
    phone: member?.phone,
    role: member?.role,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    if (e.target.name) {
      setTeamMember({
        ...teamMember,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();

    if (action === "save") {
      fetch(`http://localhost:8085/api/team/${teamMember._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamMember),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.code == 200) {
            return navigate("/");
          }

          if (data?.errors?.length > 0) {
            const errorObj = {};
            data.errors.forEach((error) => {
              errorObj[error.path] = error.msg;
            });
            setErrors(errorObj);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (action === "delete") {
      fetch(`http://localhost:8085/api/team/${teamMember._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamMember),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.code == 200) {
            return navigate("/");
          }

          if (data?.errors?.length > 0) {
            const errorObj = {};
            data.errors.forEach((error) => {
              errorObj[error.path] = error.msg;
            });
            setErrors(errorObj);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="mt-10 text-xl max-w-xl container mx-auto bg-white-100 p-4">
      <Header title="Edit a Team Member" subtitle="Edit info and role" />
      <form>
        <h3 className="font-bold text-base my-2">Info</h3>
        <TextInput
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          value={teamMember.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.firstName}
        />
        <TextInput
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={teamMember.lastName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.lastName}
        />
        <TextInput
          type="email"
          id="email"
          name="email"
          label="Email"
          value={teamMember.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.email}
        />
        <TextInput
          type="tel"
          id="phone"
          name="phone"
          label="Phone"
          value={teamMember.phone}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.phone}
        />
        <h3 className="font-bold text-base my-3">Role</h3>
        <Select
          id="role"
          name="role"
          label="Role"
          value={teamMember.role}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          defaultValue={teamMember.role}
          options={[
            { value: "regular", label: "Regular - Can't delete members" },
            { value: "admin", label: "Admin - Can delete members" },
          ]}
          error={errors.role}
        />
        <div className="flex flex-row items-center justify-between">
          <Button
            title="Delete"
            type="outline"
            action="delete"
            onClick={(e) => handleSubmit(e, "delete")}
          />
          <Button
            title="Save"
            type="solid"
            action="save"
            onClick={(e) => handleSubmit(e, "save")}
          />
        </div>
      </form>
    </div>
  );
}

export default EditTeam;
