import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRoom = () => {
  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    price: "",
    image: "",
    facilities: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // AUTO CONFIG 
  const roomConfig = {
    king: { capacity: 6, price: 5500 },
    queen: { capacity: 5, price: 6600 },
    quad: { capacity: 4, price: 7700 },
    triple: { capacity: 3, price: 8800 },
    double: { capacity: 2, price: 9900 },
  };

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // type select → auto set capacity & price
    if (name === "type") {
      const config = roomConfig[value];

      setForm({
        ...form,
        type: value,
        capacity: config.capacity,
        price: config.price,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // facilities
  const handleFacilities = (e) => {
    setForm({ ...form, facilities: e.target.value.split(",") });
  };

  // image select
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // upload image
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(`${API}/api/upload`, formData);
      return res.data.url;
    } catch (err) {
      toast.error("Image upload failed ");
      return "";
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      if (!imageUrl) {
        setLoading(false);
        return;
      }

      const finalData = {
        ...form,
        image: imageUrl,
      };

      const res = await axios.post(`${API}/api/room/create`, finalData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201) {
        toast.success("Room created successfully ");
        navigate("/admin/rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center tracking-wide">
          Create Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              placeholder="Enter room number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none hover:border-gray-400"
              onChange={handleChange}
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Room Type
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none hover:border-gray-400"
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="king">King</option>
              <option value="queen">Queen</option>
              <option value="quad">Quad</option>
              <option value="triple">Triple</option>
              <option value="double">Double</option>
            </select>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Capacity
              </label>
              <input
                type="number"
                value={form.capacity}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Price (₹)
              </label>
              <input
                type="number"
                value={form.price}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-600"
              />
            </div>
          </div>

          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Facilities
            </label>
            <input
              type="text"
              placeholder="AC, WiFi, TV"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none hover:border-gray-400"
              onChange={handleFacilities}
            />
          </div>

          
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Room Image
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:border-gray-400 transition"
              onChange={handleImageChange}
              required
            />
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
