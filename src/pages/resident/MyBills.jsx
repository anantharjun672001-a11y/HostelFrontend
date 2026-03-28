import { useEffect, useState } from "react";
import axios from "axios";

const MyBills = () => {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 5;

  const getBillList = (data) => {
    if (Array.isArray(data)) return data;
    return data?.bills || data?.data || [];
  };

  const isBillPaid = (bill) => {
    const normalizedStatus = (bill.status || bill.paymentStatus || "")
      .toString()
      .trim()
      .toLowerCase();

    return ["paid", "success", "completed", "settled"].includes(
      normalizedStatus
    );
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/bill/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBills(getBillList(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoice = async (billId) => {
    try {
      const res = await axios.get(
        `https://hostelbackend-uzne.onrender.com/api/bill/invoice/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = bills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bills.length / billsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">My Bills</h1>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Month</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {bills.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-6 py-10 text-gray-400">
                  No bills found
                </td>
              </tr>
            ) : (
              currentBills.map((bill) => (
                <tr
                  key={bill._id || bill.id || bill.month}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium">{bill.month}</td>

                  <td className="px-6 py-4">
                    {bill.resident?.room?.roomNumber || bill.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-blue-600">
                    Rs. {bill.total ?? bill.amount ?? 0}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        isBillPaid(bill)
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isBillPaid(bill) ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => downloadInvoice(bill._id || bill.id)}
                      className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {bills.length > billsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBills;
