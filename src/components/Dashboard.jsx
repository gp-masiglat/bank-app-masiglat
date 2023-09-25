import TransactionModal from "./TransactionModal";
import RecordsModal from "./RecordsModal";
import ExpensesModal from "./ExpensesModal";
import { useEffect, useState } from "react";
import bankLogo from "../assets/bank.svg";
import depositIcon from "../assets/deposit.svg";
import withdrawIcon from "../assets/withdraw.svg";
import transferIcon from "../assets/transfer.svg";

const Dashboard = (props) => {
  const { loggedUser, setLoggedUser, setCurrentPage } = props;
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [showExpensesModal, setShowExpensesModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [transactionHistoryPreview, setTransactionHistoryPreview] = useState(
    []
  );
  const [data, setCurrentData] = useState(loggedUser.transactions);
  // const [modalItem, setModalItem] = useState(0);

  useEffect(() => {
    setTransactionHistoryPreview(loggedUser.transactions.slice(0, 3));
  }, [loggedUser.balance]);

  const transactionButtonClickHandler = (e) => {
    setModalTitle(e.target.value);
    setShowTransactionModal(true);
  };
  const logoutHandler = () => {
    setLoggedUser("");
    setCurrentPage("login");
  };
  return (
    <>
      {showTransactionModal && (
        <TransactionModal
          setShowTransactionModal={setShowTransactionModal}
          title={modalTitle}
          loggedUser={loggedUser}
        />
      )}
      {showRecordsModal && (
        <RecordsModal
          setShowRecordsModal={setShowRecordsModal}
          data={data}
          setCurrentData={setCurrentData}
        />
      )}
      {showExpensesModal && (
        <ExpensesModal
          setShowExpensesModal={setShowExpensesModal}
          loggedUser={loggedUser}
        />
      )}
      <div className="w-2/5 h-full flex flex-col">
        <div className="flex justify-between w-full">
          <p>Current Logged User: {loggedUser.username} </p>
          <button className="underline" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div className="p-8">
          <div className="flex flex-col justify-center rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col items-center justify-center px-10 pb-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 ">
              <img src={bankLogo} className="w-20 h-20 mb-4" alt="bank logo" />
              <div className="flex flex-col h-64 w-4/5 items-center bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg shadow-2xl transition-transform transform hover:scale-110">
                <div className="flex justify-between w-full m-2">
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
                  <h1 className="text-gray-200 font-black font-os text-4xl">
                    {loggedUser.accountNumber.match(/.{3}/g).join(" ")}
                  </h1>
                </div>
                <div className="w-4/5 bg-black mt-4 h-8 self-center"></div>
                <div className="flex w-full items-center">
                  <div className="flex flex-col items-center justfiy-end w-1/2 mt-4 p-4 text-gray-200 font-quick">
                    <p className="font-bold text-xs">Account Name</p>
                    <h4 className="uppercase tracking-wider font-semibold text-xs">
                      {loggedUser.fullname}
                    </h4>
                  </div>
                  <div className="flex flex-col justfiy-end w-1/2 mt-4 p-4 text-gray-200 font-quick">
                    <p className="font-bold text-xl">Balance (PHP)</p>
                    <h4 className="uppercase tracking-wider font-semibold text-4xl ml-4">
                      {loggedUser.balance}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="flex text-center mt-4 font-quick justify-evenly">
                <button
                  className="w-1/5 text-center text-gray font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-emerald-400"
                  value="Deposit"
                  onClick={transactionButtonClickHandler}
                >
                  Deposit
                  <img
                    src={depositIcon}
                    className="w-full pointer-events-none"
                    alt="bank logo"
                  />
                </button>
                <button
                  className="w-1/5 text-center text-gray font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-emerald-400"
                  value="Withdraw"
                  onClick={transactionButtonClickHandler}
                >
                  Withdraw
                  <img
                    src={withdrawIcon}
                    className="w-full pointer-events-none"
                  />
                </button>

                <button
                  className="w-1/5 text-gray font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-emerald-400"
                  value="Transfer"
                  onClick={transactionButtonClickHandler}
                >
                  Transfer
                  <img
                    src={transferIcon}
                    className="w-full pointer-events-none"
                  />
                </button>
              </div>
            </div>

            <div
              className={` w-full bg-white shadow-lg flex flex-col justify-center items-center ${
                loggedUser.transactions.length === 0 ? "hidden" : ""
              }`}
            >
              <label className="text-center text-2xl font-semiboldtext-3xl font-semibold mb-2">
                Recent Transactions
              </label>
              <table className="table-fixed text-center items-center justify-center mb-4 w-4/5 shadow-lg">
                <thead>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Transaction ID
                    </th>
                    <th className="w-1/4" scope="col">
                      Type
                    </th>
                    <th className="w-1/4" scope="col">
                      Amount
                    </th>
                    <th className="w-1/4" scope="col">
                      Transaction Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistoryPreview.map((item) => (
                    <tr key={item.transactionId} className="odd:bg-blue-100">
                      <td>{item.transactionId} </td>
                      <td>{item.type} </td>
                      <td>{item.amount} </td>
                      <td>
                        {new Date(item.transactionDate).toString().slice(4, 15)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="underline mb-4"
                value=""
                onClick={() => setShowRecordsModal(true)}
              >
                Show All Transactions
              </button>
              <button value="" onClick={() => setShowExpensesModal(true)}>
                Manage Expenses
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
