import { useEffect, useState } from "react";
import axios from "axios";
import PayButton from "../components/PayButton";

const ResidentDashboard = () => {
  const [bills, setBills] = useState([]);

  const getBillList = (data) => {
    if (Array.isArray(data)) return data;
    return data?.bills || data?.data || [];
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const { data } = await axios.get(
          "https://hostelbackend-nn7o.onrender.com/api/bill/my",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBills(getBillList(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchBills();
  }, []);

  const downloadInvoice = async (billId) => {
    try {
      const response = await axios.get(
        `https://hostelbackend-nn7o.onrender.com/api/bill/invoice/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `invoice-${billId}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome Resident</h1>

      {bills.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {bills.map((bill) => {
            const normalizedStatus = (bill.status || bill.paymentStatus || "")
              .toString()
              .trim()
              .toLowerCase();

            const isPaid = ["paid", "success", "completed", "settled"].includes(
              normalizedStatus
            );

            return (
              <div
                key={bill._id || bill.id || bill.month}
                className="relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Month</p>

                    <h2 className="text-xl font-semibold text-gray-800">
                      {bill.month}
                    </h2>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isPaid
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isPaid ? "Paid" : "Unpaid"}
                  </span>
                </div>

                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-5">
                  Rs. {bill.total ?? bill.amount ?? 0}
                </p>

                <div className="flex gap-3 flex-wrap">
                  {!isPaid && (
                    <div className="flex-1">
                      <PayButton billId={bill._id || bill.id} />
                    </div>
                  )}

                  <button
                    onClick={() => downloadInvoice(bill._id || bill.id)}
                    className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition duration-300 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                  >
                    Invoice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-8 text-center text-gray-500 shadow-sm">
          No bills found
        </div>
      )}
    </div>
  );
};

export default ResidentDashboard;
