import { useEffect, useState } from "react";
import Input from "./Input";

const SignupForm = () => {
  const values = {
    username: {
      label: "Username",
      id: "username",
      type: "text",
    },
    password: {
      label: "Password",
      id: "password",
      type: "password",
    },
    confirmPassword: {
      label: "Confirm Password",
      id: "confirm-password",
      type: "password",
    },
  };
  return (
    <form className="container">
      {Object.keys(values).map((field) => {
        return (
          <Input
            key={values[field].id}
            label={values[field].label}
            type={values[field].type}
            id={values[field].id}
          />
        );
      })}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
