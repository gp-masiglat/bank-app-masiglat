import { useEffect, useState } from "react";
import Input from "./Input";
const userInfo = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];
const SignupForm = (props) => {
  const { setCurrentPage } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

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
    if (usernameExist) setErrorMessage("Username already Exist!");
    else setErrorMessage("");
  };
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onFirstNameChange = (e) => setFirstName(e.target.value.toUpperCase());
  const onLastNameChange = (e) => setLastName(e.target.value.toUpperCase());
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const onEmailAddressChange = (e) =>
    setEmailAddress(e.target.value.toUpperCase());

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="flex flex-col w-1/2 items-center bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
      onSubmit={submitHandler}
    >
      <Input
        key="firstName"
        label="First Name"
        type="text"
        id="firstName"
        value={firstName}
        onChange={onFirstNameChange}
      />
      <Input
        key="lastName"
        label="Last Name"
        type="text"
        id="lastName"
        value={lastName}
        onChange={onLastNameChange}
      />
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
      <Input
        key="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confrimPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <Input
        key="emailAddress"
        label="Email Address"
        type="text"
        id="emailAddress"
        value={emailAddress}
        onChange={onEmailAddressChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
        type="submit"
        disabled={
          username === "" || password === "" || errorMessage.length != 0
        }
      >
        Sign Up
      </button>
      <h1 className="text-red-700 text-m">{errorMessage}</h1>
    </form>
  );
};

export default SignupForm;
