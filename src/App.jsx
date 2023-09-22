import { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";

function App() {
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("accounts"))[0]);
    setCurrentPage("dashboard");
  }, []);

  const [currentPage, setCurrentPage] = useState("login");
  const [loggedUser, setLoggedUser] = useState({});

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
