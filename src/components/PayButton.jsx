import axios from "axios";
import React, { useState } from "react";

const PayButton = ({ billId }) => {

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `https://hostelbackend-uzne.onrender.com/api/bill/order/${billId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY,
  amount: data.amount,
  currency: "INR",
  order_id: data.id,

  handler: async function (response) {

    try {

      const verifyRes = await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/bill/verify-payment",
        {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          billId: billId, // 🔥 IMPORTANT
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("VERIFY RESPONSE:", verifyRes.data);

      alert("Payment successful");

      window.location.href = "/dashboard";

    } catch (err) {
      console.log("VERIFY ERROR:", err.response?.data || err.message);
      alert("Payment verified failed");
    }
  },

  theme: {
    color: "#2563eb",
  },
};

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.log("Payment error:", error?.response?.data || error.message);

      alert(error?.response?.data?.message || "Payment failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition text-white px-4 py-2 rounded-lg text-sm font-medium"
    >

      {loading ? "Processing..." : "Pay Now"}

    </button>

  );

};

export default PayButton;