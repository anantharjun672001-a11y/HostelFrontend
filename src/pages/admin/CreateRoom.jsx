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

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle facilities (comma separated)
  const handleFacilities = (e) => {
    const value = e.target.value;
    setForm({ ...form, facilities: value.split(",") });
  };

  // image select
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // upload image to backend (cloudinary)
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/upload",
        formData
      );

      return res.data.url;
    } catch (err) {
      toast.error("Image upload failed");
      return "";
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // upload image first
      const imageUrl = await uploadImage();

      const finalData = {
        ...form,
        image: imageUrl,
      };

      const res = await axios.post(
        "https://hostelbackend-uzne.onrender.com/api/room/create",
        finalData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Room created successfully ");
        navigate("/admin/rooms");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating room");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border border-gray-100 shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleChange}
            required
          />

          
          <select
            name="type"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
            <option value="quad">Quad</option>
            <option value="queen">Queen</option>
            <option value="king">King</option>
          </select>

          
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleChange}
          />

        
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleChange}
          />

          
          <input
            type="text"
            placeholder="Facilities (AC,WiFi,TV)"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleFacilities}
          />

         
          <input
            type="file"
            className="w-full border px-3 py-2 rounded-lg"
            onChange={handleImageChange}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-lg">
            Create Room
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateRoom;