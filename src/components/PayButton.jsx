import axios from "axios";
import React, { useState } from "react";

const PayButton = ({ billId }) => {
  const [loading, setLoading] = useState(false);

  const getOrderData = (responseData) => {
    const order = responseData?.order || responseData?.data || responseData;

    return {
      amount: order?.amount ?? responseData?.amount,
      billId: responseData?.billId || order?.billId || billId,
      currency: order?.currency || responseData?.currency || "INR",
      orderId:
        order?.id ||
        order?.orderId ||
        responseData?.id ||
        responseData?.orderId,
    };
  };

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

      const { amount, billId: resolvedBillId, currency, orderId } =
        getOrderData(data);

      if (!orderId || !amount) {
        throw new Error("Invalid payment order response");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount,
        currency,
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post(
              "https://hostelbackend-uzne.onrender.com/api/bill/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                billId: resolvedBillId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Payment successful");
            window.location.reload();
          } catch (err) {
            console.log("VERIFY ERROR:", err.response?.data || err.message);
            alert("Payment verification failed");
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
