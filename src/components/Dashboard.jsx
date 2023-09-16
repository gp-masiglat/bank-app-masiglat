import Modal from "./Modal";
import { useEffect, useState } from "react";
import bankLogo from "../assets/bank.svg";

const Dashboard = (props) => {
  const { loggedUser, setLoggedUser, setCurrentPage } = props;
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  // const [modalItem, setModalItem] = useState(0);

  // useEffect(() => {
  //   loggedUser += modalItem;
  // }, [modalItem]);

  const buttonClickHandler = (e) => {
    setModalTitle(e.target.value);
    setShowModal(true);
  };
  const logoutHandler = () => {
    setLoggedUser("");
    setCurrentPage("login");
  };
  return (
    <>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          title={modalTitle}
          loggedUser={loggedUser}
        />
      ) : (
        ""
      )}
      <div className="w-1/3 h-full flex flex-col">
        <div className="flex justify-between w-full">
          <p>Current Logged User: {loggedUser.username} </p>
          <button className="underline" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="p-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col items-center justify-center px-10 pb-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 ">
              <img src={bankLogo} className="w-20 h-20 mb-10" alt="bank logo" />
              <div className="w-full h-64 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg shadow-2xl transition-transform transform hover:scale-110">
                <div className="flex justify-between m-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="7" y1="15" x2="7.01" y2="15" />
                    <line x1="11" y1="15" x2="13" y2="15" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
                    <circle cx="14.5" cy="14.5" r="5.5" />
                  </svg>
                </div>
                <div className="flex justify-center mt-4">
                  <h1 className="text-gray-400 font-black font-os text-4xl">
                    {loggedUser.accountNumber.match(/.{3}/g).join(" ")}
                  </h1>
                </div>
                <div className="flex w-full items-center">
                  <div className="flex flex-col items-center justfiy-end w-1/2 mt-4 p-4 text-gray-400 font-quick">
                    <p className="font-bold text-xs">Account Name</p>
                    <h4 className="uppercase tracking-wider font-semibold text-xs">
                      {loggedUser.fullname}
                    </h4>
                  </div>
                  <div className="flex flex-col justfiy-end w-1/2 mt-4 p-4 text-gray-400 font-quick">
                    <p className="font-bold text-xl">Balance (PHP)</p>
                    <h4 className="uppercase tracking-wider font-semibold text-4xl ml-4">
                      {loggedUser.balance}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex text-center mt-8 mb-2 font-quick justify-evenly">
              <button value="Deposit" onClick={buttonClickHandler}>
                Deposit
              </button>
              <button value="Withdraw" onClick={buttonClickHandler}>
                Withdrawal
              </button>
              <button value="Transfer" onClick={buttonClickHandler}>
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
