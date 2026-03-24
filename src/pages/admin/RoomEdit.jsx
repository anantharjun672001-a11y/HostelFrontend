import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RoomEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    capacity: "",
    price: "",
    facilities: [],
    image: "",
    
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
  const res = axios.get(`https://stay-hive.onrender.com/api/room/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  console.log(res.data); 

  setForm({
    roomNumber: res.data.room?.roomNumber || "",
    type: res.data.room?.type || "",
    capacity: res.data.room?.capacity || "",
    price: res.data.room?.price || "",
    image: res.data.room?.image || "",
    facilities: res.data.room?.facilities || [],
  });
};

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFacilities = (e) => {
    setForm({ ...form, facilities: e.target.value.split(",") });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    await axios.put(
      `/api/room/${id}`,
      { ...form, image: imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Updated successfully");
    navigate("/admin/rooms");
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
              value={form.roomNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter room number"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="single">Double</option>
              <option value="double">Triple</option>
              <option value="quad">Quad</option>
              <option value="queen">Queen</option>
              <option value="king">King</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter capacity"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter price"
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
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2.5 rounded-lg shadow-md"
          >
            Update Room
          </button>

        </form>
      </div>
    </div>
  );
};

export default RoomEdit;