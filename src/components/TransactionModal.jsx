import { useEffect, useState } from "react";
import Input from "./Input";

const TransactionModal = (props) => {
  const { setShowTransactionModal, title, loggedUser } = props;
  const [modalItem, setModalItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [receiverItem, setReceiverItem] = useState("");
  const [receiverObject, setReceiverObject] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [receiverError, setReceiverError] = useState(false);
  // const [transactionInfo, setTransactionInfo] = useState({});

  useEffect(() => {
    // if (title === "Transfer") {
    setUserInfo(JSON.parse(localStorage.getItem("accounts")));
    setReceiverError(true);
    // }
  }, []);

  //   useEffect(() => {
  //     if (Object.keys(transactionInfo).length != 0)
  //       loggedUser.trasactions.push(transactionInfo);
  //   }, [transactionInfo]);

  const onModalItemChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "") setModalItem(0);
    if (re.test(e.target.value)) setModalItem(e.target.value);

    setErrorMessage(
      title != "Deposit" && e.target.value > loggedUser.balance
        ? "* Insufficient Funds!\n"
        : ""
    );
  };

  const onReceiverItemChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setReceiverItem(e.target.value);
    }

    if (e.target.value === loggedUser.accountNumber) {
      setErrorMessage("*Cannot transfer to own account!\n");
      setReceiverError(true);
      return;
    }

    let userObject = userInfo.find(
      (userObject) => userObject.accountNumber === e.target.value
    );

    if (userObject) {
      setReceiverObject(userObject);
      setReceiverError(false);
      setErrorMessage("");
    } else {
      setErrorMessage("*Account number does not exist!\n");
      setReceiverError(true);
    }
  };

  const modalSubmitHandler = () => {
    loggedUser.balance += (title === "Deposit" ? 1 : -1) * modalItem;
    if (title === "Transfer") {
      receiverObject.balance += parseInt(modalItem);
      loggedUser.transactions.push({
        transactionId: (
          "TR" + Math.floor(Date.now() * Math.random())
        ).substring(0, 6),
        type: "Fund Transfer",
        amount: parseInt(modalItem),
        balance: loggedUser.balance,
        description: `Fund Transfer to ${receiverObject.accountNumber}`,
        transactionDate: new Date().toJSON(),
      });
      receiverObject.transactions.unshift({
        transactionId: (
          "TR" + Math.floor(Date.now() * Math.random())
        ).substring(0, 6),
        type: "Fund Transfer",
        amount: parseInt(modalItem),
        balance: receiverObject.balance,
        description: `Fund Transfer from ${loggedUser.accountNumber}`,
        transactionDate: new Date().toJSON(),
      });
    } else {
      loggedUser.transactions.unshift({
        transactionId: (
          "TR" + Math.floor(Date.now() * Math.random())
        ).substring(0, 6),
        type: title,
        amount: parseInt(modalItem),
        balance: loggedUser.balance,
        description: title,
        transactionDate: new Date().toJSON(),
      });
    }
    userInfo[
      userInfo.findIndex((object) => {
        return object.accountNumber === loggedUser.accountNumber;
      })
    ] = loggedUser;
    localStorage.setItem("accounts", JSON.stringify(userInfo));
    // console.log(JSON.stringify(userInfo));
    setShowTransactionModal(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowTransactionModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {title === "Transfer" && (
                <Input
                  key="receiver"
                  label="Receiver's Account Number"
                  type="text"
                  id="receiver"
                  value={receiverItem}
                  onChange={onReceiverItemChange}
                />
              )}
              <Input
                key="modalItem"
                label={`Amount to ${title}`}
                type="text"
                id="modalItem"
                value={modalItem}
                onChange={onModalItemChange}
              />

              <p className="text-red-700 text-m text-center whitespace-pre-line">
                {errorMessage}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowTransactionModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={modalSubmitHandler}
                disabled={receiverError && errorMessage != ""}
              >
                {title}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default TransactionModal;
