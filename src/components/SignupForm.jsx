import { useEffect, useState } from "react";
import Input from "./Input";
import bankLogo from "../assets/bank.svg";

const SignupForm = (props) => {
  const { setCurrentPage } = props;
  // const [userInfo, setUserInfo] = useState([]);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cofimPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errorFieldArray, setError] = useState([
    { errorField: "First Name" },
    { errorField: "Last Name" },
    { errorField: "Username" },
    { errorField: "Password" },
    { errorField: "Confirm Password" },
    { errorField: "Email Address" },
  ]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  // useEffect(() => {
  //   console.log(new Date());
  // }, []);

  useEffect(() => {
    if (confirmPassword != "")
      onConfirmPasswordChange({ target: { value: confirmPassword } });
  }, [password]);

  const checkIfEmpty = (fieldName, value) => {
    let errorObject = errorFieldArray.findIndex(
      (userObject) => userObject.errorField === fieldName
    );
    if (value === "") {
      if (!errorObject) errorFieldArray.push({ errorField: fieldName });
      return `*Please input ${fieldName}!`;
    }
    if (errorObject > -1) errorFieldArray.splice(errorObject, 1);
    return "";
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(checkIfEmpty("Username", e.target.value));
  };

  const onPasswordChange = (e) => {
    let errorMessage = "";
    setPassword(e.target.value);
    let errorObject = errorFieldArray.find(
      (userObject) => userObject.errorField === "Password"
    );

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
      if (!errorObject) errorFieldArray.push({ errorField: "Password" });
      return;
    }

    if (errorObject)
      errorFieldArray.splice(errorFieldArray.indexOf(errorObject), 1);
    setPasswordError("");
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value.toUpperCase());
    setFirstNameError(checkIfEmpty("First Name", e.target.value));
  };
  const onLastNameChange = (e) => {
    setLastName(e.target.value.toUpperCase());
    setLastNameError(checkIfEmpty("Last Name", e.target.value));
  };
  const onConfirmPasswordChange = (e) => {
    console.log(e.target.value);
    setConfirmPassword(e.target.value);
    let errorObject = errorFieldArray.find(
      (userObject) => userObject.errorField === "Confirm Password"
    );

    if (password != e.target.value) {
      setConfirmPasswordError("*Passwords do not match!");
      if (!errorObject) errorFieldArray.push("Confirm Password");
      // return;
    } else {
      if (errorObject)
        errorFieldArray.splice(errorFieldArray.indexOf(errorObject), 1);
      setConfirmPasswordError("");
    }
  };

  const onEmailAddressChange = (e) => {
    setEmailAddress(e.target.value.toUpperCase());

    let errorObject = errorFieldArray.find(
      (userObject) => userObject.errorField === "Email Address"
    );

    if (e.target.value === "") setEmailError("Email Address Cannot be empty!");
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
      setEmailError("Please follow the following format (example@example.com");

    if (emailError != "") errorFieldArray.push("Email Address");
    else {
      // if (emailError != "") {
      setEmailError("");
      if (errorObject)
        errorFieldArray.splice(errorFieldArray.indexOf(errorObject), 1);
      setEmailError("");
      // }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const userInfo = localStorage.getItem("accounts")
      ? JSON.parse(localStorage.getItem("accounts"))
      : [];

    let userObject = userInfo.find(
      (userObject) => userObject.username === username
    );

    if (userObject) {
      setUsernameError("*Username already Exist!");
      return;
    }

    // let accountNumber = ("" + Math.random()).substring(2, 14);
    // while (
    //   userInfo.find((userObject) => userObject.accountNumber === accountNumber)
    // )
    const accountNumber = (
      "" + Math.floor(Date.now() * Math.random())
    ).substring(0, 12);

    userInfo.push({
      accountNumber: accountNumber,
      username: username,
      password: password,
      fullname: firstName + " " + lastName,
      email: emailAddress,
      balance: 0,
      dateCreated: new Date(),
      expenses: [],
      transactions: [],
    });
    // localStorage.removeItem("accounts");
    // console.log(userInfo);
    localStorage.setItem("accounts", JSON.stringify(userInfo));
    setCurrentPage("login");
  };

  return (
    <form
      className="flex flex-col w-1/2 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-5"
      onSubmit={submitHandler}
    >
      <img src={bankLogo} className="w-20 h-20 mb-10" alt="bank logo" />
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
      <p className="text-red-700 text-m whitespace-pre-line	 bg-gray-200">
        {passwordError}
      </p>
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
      <button className="underline" onClick={() => setCurrentPage("login")}>
        Back to Login
      </button>
    </form>
  );
};

export default SignupForm;
