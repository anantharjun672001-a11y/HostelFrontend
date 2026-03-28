import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "https://hostelbackend-uzne.onrender.com";

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`${API}/api/room/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setRoom(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${API}/api/payments/create-order`,
        { roomId: room._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { orderId, amount, key } = res.data;

      const options = {
        key,
        amount: amount * 100,
        currency: "INR",
        name: "StayHive",
        description: "Room Booking Payment",
        order_id: orderId,

        // Verify immediately after Razorpay success so we do not depend only on webhook.
        handler: async function (response) {
          try {
            await axios.post(
              `${API}/api/bill/verify-payment`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            toast.success("Payment Successful");
            navigate("/resident/my-room");
          } catch (err) {
            console.log(err);
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!room) return <div className="p-6 text-red-500">Room not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <div className="grid md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
          <div className="h-[260px] overflow-hidden">
            <img
              src={room.image}
              alt="room"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">
            Room {room.roomNumber}
          </h1>

          <p className="text-gray-600">
            <span className="font-medium">Type:</span> {room.type}
          </p>

          <p className="text-gray-600">
            <span className="font-medium">Capacity:</span> {room.capacity}
          </p>

          <p className="text-gray-600">
            <span className="font-medium">Occupied:</span> {room.occupied}
          </p>

          {/* FACILITIES */}
          <div>
            <h3 className="font-semibold mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {room.facilities?.map((f, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PAY CARD */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white space-y-4">

          <h2 className="text-xl font-semibold">Pricing</h2>

          <p>
            Monthly Rent:
            <span className="font-bold ml-2">₹{room.price}</span>
          </p>

          <p>
            Advance:
            <span className="font-bold ml-2">₹{room.price}</span>
          </p>

          <p className="text-sm opacity-90">
            First month includes advance + rent
          </p>

          <button
            onClick={handlePayment}
            className="w-full py-3 rounded-xl font-semibold
            bg-white text-blue-600
            hover:bg-gray-100
            transition transform hover:scale-105 shadow-md"
          >
            Pay Now
          </button>

        </div>
      </div>

    </div>
  );
};

export default RoomDetails;
