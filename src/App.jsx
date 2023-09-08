import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [count, setCount] = useState();

  return (
    <>
      <SignupForm />
    </>
  );
}

export default App;
