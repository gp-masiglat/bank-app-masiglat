import { useEffect, useState } from "react";
import Input from "./Input";

const SignupForm = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const { setCurrentPage } = props;
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cofimPasswordError, setconfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorFieldArray, setError] = useState([
    "First Name",
    "Last Name",
    "Username",
    "Password",
    "Confirm Password",
    "Email Address",
  ]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(
    () =>
      setUserInfo(
        localStorage.getItem("accounts")
          ? JSON.parse(localStorage.getItem("accounts"))
          : []
      ),
    []
  );

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    let errorMessage = "";

    let userObject = userInfo.find(
      (userObject) => userObject.username === e.target.value
    );
    if (userObject) {
      errorMessage = "*Username already Exist!";
    }
    if (e.target.value === "") {
      errorMessage = "*Please input username!";
    }
    if (errorMessage.length != 0) {
      setUsernameError(errorMessage);
      if (errorFieldArray.indexOf("Username") === -1)
        errorFieldArray.push("Username");
    } else {
      setUsernameError("");
      if (errorFieldArray.indexOf("Username") != -1)
        errorFieldArray.splice(errorFieldArray.indexOf("Username"), 1);
    }
  };
  const onPasswordChange = (e) => {
    let errorMessage = "";
    setPassword(e.target.value);

    errorMessage +=
      e.target.value.length < 8
        ? "*Password should be atleast 8 characters long\n"
        : "";
    errorMessage += /(?=.*?[A-Z])/.test(e.target.value)
      ? ""
      : "*Password should contain atleast 1 UPPER CASE character\n";
    errorMessage += /(?=.*?[0-9])/.test(e.target.value)
      ? ""
      : "*Password should contain atleast 1 NUMERIC character\n";
    errorMessage += /(?=.*?[#?!@$%^&*-])/.test(e.target.value)
      ? ""
      : "*Password should contain atleast 1 SPECIAL character\n";

    if (errorMessage.length > 0) {
      setPasswordError(errorMessage);
      if (errorFieldArray.indexOf("Password") === -1)
        errorFieldArray.push("Password");
    } else {
      setPasswordError("");
      if (errorFieldArray.indexOf("Password") != -1)
        errorFieldArray.splice(errorFieldArray.indexOf("Password"), 1);
    }
  };
  const onFirstNameChange = (e) => {
    setFirstName(e.target.value.toUpperCase());

    if (e.target.value === "") {
      setFirstNameError("*Please input first name!");
      errorFieldArray.push(
        errorFieldArray.indexOf("First Name") === -1 ? "First Name" : ""
      );
    } else {
      setFirstNameError("");
      if (errorFieldArray.indexOf("First Name") != -1)
        errorFieldArray.splice(errorFieldArray.indexOf("First Name"), 1);
    }
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value.toUpperCase());

    if (e.target.value === "") {
      setLastNameError("*Please input last name!");
      errorFieldArray.push(
        errorFieldArray.indexOf("Last Name") === -1 ? "Last Name" : ""
      );
    } else {
      setLastNameError("");
      if (errorFieldArray.indexOf("Last Name") != -1)
        errorFieldArray.splice(errorFieldArray.indexOf("Last Name"), 1);
    }
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    if (password != e.target.value) {
      setconfirmPasswordError("*Passwords do not match!");
      if (errorFieldArray.indexOf("Confirm Password") === -1)
        errorFieldArray.push("Confirm Password");
    } else {
      setconfirmPasswordError("");
      if (errorFieldArray.indexOf("Confirm Password") != -1)
        errorFieldArray.splice(errorFieldArray.indexOf("Confirm Password"), 1);
    }
  };
  const onEmailAddressChange = (e) => {
    setEmailAddress(e.target.value.toUpperCase());

    if (e.target.value == "") {
      setEmailError("Email Address Cannot be empty!");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
    ) {
      setEmailError("Please follow the following format (example@example.com");
    } else {
      if (emailError != "") {
        setEmailError("");
        if (errorFieldArray.indexOf("Email Address") != -1)
          errorFieldArray.splice(errorFieldArray.indexOf("Email Address"), 1);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let accountNumber = ("" + Math.random()).substring(2, 14);
    while (
      userInfo.find((userObject) => userObject.accountNumber === accountNumber)
    )
      accountNumber = ("" + Math.random()).substring(2, 14);
    // console.log(accountNumber);
    userInfo.push({
      accountNumber: accountNumber,
      username: username,
      password: password,
      fullname: firstName + " " + lastName,
      email: emailAddress,
      balance: 0,
      expenses: [],
      transactions: [],
    });
    localStorage.removeItem("accounts");
    localStorage.setItem("accounts", JSON.stringify(userInfo));
    setCurrentPage("login");
  };
  return (
    <form
      className="flex flex-col w-1/2 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
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
      <p className="text-red-700 text-m">{firstNameError}</p>
      <Input
        key="lastName"
        label="Last Name"
        type="text"
        id="lastName"
        value={lastName}
        onChange={onLastNameChange}
      />
      <p className="text-red-700 text-m">{lastNameError}</p>
      <Input
        key="username"
        label="Username"
        type="text"
        id="username"
        value={username}
        onChange={onUsernameChange}
      />
      <p className="text-red-700 text-m">{usernameError}</p>
      <Input
        key="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <p className="text-red-700 text-m whitespace-pre-line	">{passwordError}</p>
      <Input
        key="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confrimPassword"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <p className="text-red-700 text-m">{cofimPasswordError}</p>
      <Input
        key="emailAddress"
        label="Email Address"
        type="text"
        id="emailAddress"
        value={emailAddress}
        onChange={onEmailAddressChange}
      />
      <p className="text-red-700 text-m">{emailError}</p>
      <button
        className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700 disabled:cursor-not-allowed"
        type="submit"
        disabled={errorFieldArray.length != 0}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
