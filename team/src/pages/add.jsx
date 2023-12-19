//ADD TEAM MEMBER PAGE

import React, { useState } from "react";
import Header from "shared/Header";
import Button from "shared/Button";
import TextInput from "shared/Input";
import Select from "shared/Select";
import { useNavigate } from "react-router-dom";

function AddTeam() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "regular",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    if (e.target.name) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8085/api/team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.code == 201) {
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
  };

  return (
    <div className="mt-10 text-xl max-w-xl container mx-auto bg-white-100 p-4">
      <Header title="Add a Team Member" subtitle="Set email, info and role" />
      <form onSubmit={handleSubmit}>
        <h3 className="font-bold text-base my-2">Info</h3>
        <TextInput
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          value={formValues.firstName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.firstName}
        />
        <TextInput
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formValues.lastName}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.lastName}
        />
        <TextInput
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formValues.email}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.email}
        />
        <TextInput
          type="tel"
          id="phone"
          name="phone"
          label="Phone"
          value={formValues.phone}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          error={errors.phone}
        />
        <h3 className="font-bold text-base my-3">Role</h3>
        <Select
          id="role"
          name="role"
          label="Role"
          value={formValues.role}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          defaultValue="regular"
          options={[
            { value: "regular", label: "Regular - Can't delete members" },
            { value: "admin", label: "Admin - Can delete members" },
          ]}
        />
        <Button type="solid" title="Save" />
      </form>
    </div>
  );
}

export default AddTeam;
