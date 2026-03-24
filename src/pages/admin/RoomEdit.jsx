import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RoomEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    price: "",
    facilities: [],
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  //FETCH ROOM
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/api/room/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.room || res.data;

        setForm({
          roomNumber: data.roomNumber || "",
          type: data.type || "",
          capacity: data.capacity || "",
          price: data.price || "",
          image: data.image || "",
          facilities: data.facilities || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load room data");
      }
    };

    fetchRoom();
  }, [id, API]);

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFacilities = (e) => {
    setForm({ ...form, facilities: e.target.value.split(",") });
  };


  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  // UPLOAD IMAGE
  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(`${API}/api/upload`, formData);
      return res.data.url;
    } catch (err) {
      toast.error("Image upload failed");
      return form.image;
    }
  };

  // UPDATE ROOM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      await axios.put(
        `${API}/api/room/${id}`,
        { ...form, image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Room updated successfully");
      navigate("/admin/rooms");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              name="roomNumber"
              value={form.roomNumber || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="type"
              value={form.type || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="king">King</option>
              <option value="queen">Queen</option>
              <option value="quad">Quad</option>
              <option value="triple">Triple</option>
              <option value="double">Double</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              name="capacity"
              value={form.capacity || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              name="price"
              value={form.price || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facilities
            </label>
            <input
              value={form.facilities?.join(",") || ""}
              onChange={handleFacilities}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="AC, WiFi, TV"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Image
            </label>
            <input
              type="file"
              onChange={handleImage}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            />
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2.5 rounded-lg shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Updating..." : "Update Room"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RoomEdit;