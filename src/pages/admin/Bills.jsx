import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Download } from "lucide-react";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "https://hostelbackend-uzne.onrender.com/api/bill",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBills(res.data);
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

 
  const filteredBills = bills.filter((bill) => {
    const name = bill.resident?.userId?.name?.toLowerCase() || "";
    const matchesSearch = name.includes(search.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && bill.status === filter;
  });

 
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentBills = filteredBills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          All Bills
        </h1>

        {/* FILTER */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none px-5 py-2.5 pr-10 rounded-xl border bg-white
            shadow-sm cursor-pointer transition-all duration-300
            hover:border-blue-400 hover:shadow-md
            focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <span className="absolute right-3 top-2.5 text-gray-400">▼</span>
        </div>

      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-1/3 group">
        <Search className="absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition" />

        <input
          type="text"
          placeholder="Search by resident..."
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
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Invoice</th>
            </tr>
          </thead>

          <tbody>
            {currentBills.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No bills found
                </td>
              </tr>
            ) : (
              currentBills.map((bill) => (
                <tr
                  key={bill._id}
                  className="border-t hover:bg-blue-50/50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {bill.resident?.userId?.name || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {bill.resident?.room?.roomNumber || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(bill.month + "-01").toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{bill.total}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        bill.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : bill.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>

                  {/* DOWNLOAD */}
                  <td className="px-6 py-4 flex justify-center">
                    <button
                      onClick={() => downloadInvoice(bill._id)}
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

      
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 rounded-lg text-sm font-medium
          bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed
          transition"
        >
          Prev
        </button>

        
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

export default Bills;
