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
    image: "",
    facilities: [],
  });

  const [imageFile, setImageFile] = useState(null);

  // fetch data
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await axios.get(`/api/room/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setForm(res.data);
    };

    fetchRoom();
  }, [id]);

  // change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFacilities = (e) => {
    setForm({ ...form, facilities: e.target.value.split(",") });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  // upload image
  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post("/api/upload", formData);
    return res.data.url;
  };

  // update
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

    alert("Updated successfully ");
    navigate("/admin/rooms");
  };

  return (
    <div className="p-6">
      <h2>Edit Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="roomNumber" value={form.roomNumber} onChange={handleChange} />
        <input name="capacity" value={form.capacity} onChange={handleChange} />
        <input name="price" value={form.price} onChange={handleChange} />

        <input
          placeholder="Facilities (AC,WiFi)"
          onChange={handleFacilities}
        />

        <input type="file" onChange={handleImage} />

        <button className="bg-green-500 text-white px-4 py-2">
          Update
        </button>

      </form>
    </div>
  );
};

export default RoomEdit;