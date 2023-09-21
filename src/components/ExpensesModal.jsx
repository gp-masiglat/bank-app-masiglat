import { useEffect, useState } from "react";
import Input from "./Input";

const ExpensesModal = (props) => {
  const { setShowExpensesModal, data } = props;

  const submitHandler = () => {
    console.log("submit");
  };
  const cancelHandler = () => {
    console.log("cancel");
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Manage Expenses</h3>
              <button
                className="p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowExpensesModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex gap-x-4">
              <Input
                key="expenseItem"
                label="Expense Item"
                type="text"
                id="expenseItem"
                // value={receiverItem}
                // onChange={onReceiverItemChange}
              />
              <Input
                key="amount"
                label="Amount"
                type="text"
                id="amount"
                // value={modalItem}
                // onChange={onModalItemChange}
              />
            </div>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={submitHandler}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowExpensesModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ExpensesModal;
