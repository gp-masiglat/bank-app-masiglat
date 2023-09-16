import { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";

function App() {
  // useEffect(() => {
  //   const userInfo = [
  //     { username: "user1", password: "password1" },
  //     { username: "user2", password: "password2" },
  //   ];
  //   localStorage.setItem("accounts", JSON.stringify(userInfo));
  // }, []);

  const [currentPage, setCurrentPage] = useState("login");
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {currentPage === "login" && (
        <LoginForm
          setCurrentPage={setCurrentPage}
          setLoggedUser={setLoggedUser}
        />
      )}
      {currentPage === "register" && (
        <SignupForm setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <Dashboard
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;
