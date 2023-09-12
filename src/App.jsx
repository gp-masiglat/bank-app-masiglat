import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <div className="flex justify-center h-screen items-center">
      {currentPage === "login" && (
        <LoginForm
          setCurrentPage={setCurrentPage}
          setLoggedUser={setLoggedUser}
        />
      )}
      {currentPage === "register" && (
        <SignupForm setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard"
        ? console.log(loggedUser)
        : console.log("please log in")}
    </div>
  );
}

export default App;
