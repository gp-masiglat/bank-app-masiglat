import { useEffect, useState } from "react";
import Input from "./Input";

const userInfo = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

const LoginForm = (props) => {
  const { setCurrentPage, setLoggedUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    let usernameExist = false;

    userInfo.forEach((user) => {
      if (user.username === e.target.value) {
        usernameExist = true;
        return;
      }
    });
    let message = "";
    if (!usernameExist) setErrorMessage("User not found!");
    else setErrorMessage("");
  };
  const onPasswordChange = (e) => setPassword(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    userInfo.forEach((user) => {
      if (user.username === username) {
        if (user.password === password) {
          // setLoggedUser(username);
          // setCurrentPage("register");
          console.log(e);
        } else {
          setErrorMessage("Username and Password did not match!");
          setUsername("");
          setPassword("");
        }
      }
    });
  };

  return (
    <form
      className="flex flex-col w-1/2 items-center bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
      onSubmit={submitHandler}
    >
      <Input
        key="username"
        label="Username"
        type="text"
        id="username"
        value={username}
        onChange={onUsernameChange}
      />
      <Input
        key="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
        type="submit"
        disabled={
          username === "" || password === "" || errorMessage.length != 0
        }
      >
        Login
      </button>
      <h1 className="text-red-700 text-m">{errorMessage}</h1>
      <a
        className="underline"
        href="#"
        onClick={() => setCurrentPage("register")}
      >
        Create Account
      </a>
    </form>
  );
};

export default LoginForm;
