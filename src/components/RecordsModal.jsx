import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Records = (props) => {
  const { setShowRecordsModal, data } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-4/5 my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Transaction Records</h3>
              <button
                className="p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowRecordsModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <table className="table-fixed text-center items-center mb-8">
                <thead>
                  <tr>
                    <th className="w-1/6" scope="col">
                      Transaction Number
                    </th>
                    <th className="w-1/6" scope="col">
                      Type
                    </th>
                    <th className="w-1/6" scope="col">
                      Amount
                    </th>
                    <th className="w-1/6" scope="col">
                      Running Balance
                    </th>
                    <th className="w-1/6" scope="col">
                      Description
                    </th>
                    <th className="w-1/6" scope="col">
                      Transaction Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((item) => (
                    <tr
                      key={item.transactionId}
                      className="even:bg-amber-100 odd:bg-blue-100"
                    >
                      <td>{item.transactionId} </td>
                      <td>{item.type} </td>
                      <td>{item.amount} </td>
                      <td>{item.balance} </td>
                      <td>{item.description} </td>
                      <td>{Date(item.transactionDate).slice(0, 24)} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowRecordsModal(false)}
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

export default Records;
