import { useEffect, useState } from "react";
import Input from "./Input";

const LoginForm = (props) => {
  const { setCurrentPage, setLoggedUser } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accounts"))
      setUserInfo(JSON.parse(localStorage.getItem("accounts")));
    else setCurrentPage("register");
  }, []);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    let userObject = userInfo.find(
      (userObject) =>
        userObject.username === username && userObject.password === password
    );

    if (userObject) {
      setCurrentPage("dashboard");
      setLoggedUser(userObject);
    } else setErrorMessage("Username or Password is incorrect!");
  };

  return (
    <form
      className="flex flex-col w-1/2 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
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
        disabled={username === "" || password === ""}
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
