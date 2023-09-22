import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Records = (props) => {
  const { setShowRecordsModal, data, setCurrentData } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [currentRecords, setCurrentRecords] = useState(
    data.slice(indexOfFirstRecord, indexOfLastRecord)
  );
  const [isTIdAsc, setIsTIdAsc] = useState(false);
  const [isTTypeAsc, setIsTTypeAsc] = useState(false);
  const [isTAmountAsc, setIsTAmountAsc] = useState(false);
  const [isTDateAsc, setIsTDateAsc] = useState(false);
  const nPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    setCurrentRecords(data.slice(indexOfFirstRecord, indexOfLastRecord));
  }, [isTIdAsc, isTTypeAsc, isTAmountAsc, isTDateAsc, currentPage]);

  const transactionCLickHandler = () => {
    const sortedArray = data.sort((a, b) => {
      let item1 = a.transactionId,
        item2 = b.transactionId;

      if (item1 < item2) {
        return !isTIdAsc ? -1 : 1;
      }
      if (item1 > item2) {
        return !isTIdAsc ? 1 : -1;
      }
      return 0;
    });
    setIsTIdAsc(!isTIdAsc);
    setCurrentData(sortedArray);
  };
  const typeCLickHandler = () => {
    const sortedArray = data.sort((a, b) => {
      let item1 = a.type,
        item2 = b.type;

      if (item1 < item2) {
        return !isTTypeAsc ? -1 : 1;
      }
      if (item1 > item2) {
        return !isTTypeAsc ? 1 : -1;
      }
      return 0;
    });
    setIsTTypeAsc(!isTTypeAsc);
    setCurrentData(sortedArray);
  };
  const amountCLickHandler = () => {
    const sortedArray = data.sort((a, b) => {
      let item1 = a.amount,
        item2 = b.amount;

      return !isTAmountAsc ? item1 - item2 : item2 - item1;
    });
    setIsTAmountAsc(!isTAmountAsc);
    setCurrentData(sortedArray);
  };
  const dateCLickHandler = () => {
    const sortedArray = data.sort((a, b) => {
      let item1 = new Date(a.transactionDate),
        item2 = new Date(b.transactionDate);

      return !isTDateAsc ? item1 - item2 : item2 - item1;
    });
    setIsTDateAsc(!isTDateAsc);
    setCurrentData(sortedArray);
  };

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
            <div className="relative p-6 flex flex-col items center">
              <table className="table-fixed text-center items-center mb-8">
                <thead>
                  <tr>
                    <th className="w-1/6 py-3" scope="col">
                      <a
                        href="#"
                        className="flex space-x-8"
                        onClick={transactionCLickHandler}
                      >
                        <span className="w-2/3">Transaction ID</span>
                        <svg
                          className="w-1/3 h-4 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </th>
                    <th className="w-1/6 py-3" scope="col">
                      <a
                        href="#"
                        className="flex space-x-8"
                        onClick={typeCLickHandler}
                      >
                        <span className="w-1/2">Type</span>
                        <svg
                          className="w-1/2 h-4 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </th>
                    <th className="w-1/6 py-3" scope="col">
                      <a
                        href="#"
                        className="flex space-x-8"
                        onClick={amountCLickHandler}
                      >
                        <span className="w-1/2">Amount</span>
                        <svg
                          className="w-1/2 h-4 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </th>
                    <th className="w-1/6 py-3" scope="col">
                      Running Balance
                    </th>
                    <th className="w-1/6 py-3" scope="col">
                      Description
                    </th>
                    <th className="w-1/6 py-3" scope="col">
                      <a
                        href="#"
                        className="flex space-x-8"
                        onClick={dateCLickHandler}
                      >
                        <span className="w-1/2">Date</span>
                        <svg
                          className="w-1/2 h-4 ml-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((item) => (
                    <tr
                      key={item.transactionId}
                      className="even:bg-amber-100 odd:bg-blue-100"
                    >
                      <td className="text-xl py-3">{item.transactionId} </td>
                      <td>{item.type} </td>
                      <td>{item.amount} </td>
                      <td>{item.balance} </td>
                      <td>{item.description} </td>
                      <td>
                        {new Date(item.transactionDate).toString().slice(0, 24)}
                      </td>
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
