import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Download } from "lucide-react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-nn7o.onrender.com/api/bill/history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPayments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoice = async (billId) => {
    try {
      const res = await axios.get(
        `https://hostelbackend-nn7o.onrender.com/api/bill/invoice/${billId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${billId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

 
  const filteredPayments = payments.filter((payment) => {
    const name = payment.resident?.userId?.name?.toLowerCase() || "";

    const month = new Date(payment.month + "-01")
      .toLocaleString("default", { month: "long", year: "numeric" })
      .toLowerCase();

    const searchText = search.toLowerCase();

    return name.includes(searchText) || month.includes(searchText);
  });


  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPayments = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      
      <h1 className="text-3xl font-bold text-gray-800">
        Payment History
      </h1>

      
      <div className="relative w-full md:w-1/3 group">
        <Search className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

        <input
          type="text"
          placeholder="Search by resident or month..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white
          shadow-sm transition-all duration-300
          group-hover:shadow-md group-hover:border-blue-400
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        <table className="w-full text-sm text-left text-gray-600">

          <thead className="bg-gray-50 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Resident</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Receipt</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-center">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {currentPayments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No payments found
                </td>
              </tr>
            ) : (
              currentPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t hover:bg-blue-50/50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payment.resident?.userId?.name}
                  </td>

                  <td className="px-6 py-4">
                    {payment.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(payment.month + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{payment.total}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {payment.receipt}
                  </td>

                  <td className="px-6 py-4">
                    {payment.paymentDate
                      ? new Date(payment.paymentDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* DOWNLOAD */}
                  <td className="px-6 py-4 flex justify-center">
                    <button
                      onClick={() => downloadInvoice(payment._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
                      bg-gradient-to-r from-blue-500 to-indigo-600 text-white
                      shadow-md hover:shadow-xl
                      hover:from-indigo-600 hover:to-blue-500
                      transition-all duration-300
                      transform hover:scale-105 active:scale-95"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Payments;