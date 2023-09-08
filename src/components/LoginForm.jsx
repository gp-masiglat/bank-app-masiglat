import { useEffect, useState } from "react";
import Input from "./Input";

const LoginForm = () => {
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
  };
  return (
    <form className="">
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
