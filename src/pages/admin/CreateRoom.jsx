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

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // facilities
  const handleFacilities = (e) => {
    setForm({ ...form, facilities: e.target.value.split(",") });
  };

  // image select
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  //  upload image
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      console.log("Uploading image...");

      const res = await axios.post(`${API}/api/upload`, formData);

      console.log("Upload success:", res.data);

      return res.data.url;
    } catch (err) {
      console.log("Upload error:", err);
      toast.error("Image upload failed ");
      return "";
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED ");

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

      console.log("Sending data:", finalData);

      const res = await axios.post(
        `${API}/api/room/create`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response:", res);

      if (res.status === 201) {
        toast.success("Room created successfully ");
        navigate("/admin/rooms");
      }
    } catch (error) {
      console.log("ERROR:", error);
      toast.error(error.response?.data?.message || "Error creating room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white border shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6">Create Room</h2>

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
            required
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
            required
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
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2.5 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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