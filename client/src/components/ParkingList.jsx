import React, { useEffect, useState } from "react";
import {
  fetchParkings,
  createParking,
  updateParking,
  deleteParking,
} from "../api/parkingService";

const ParkingList = ({ isAdmin }) => {
  const [parkings, setParkings] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    location: "",
    spaces: "",
    fee: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadParkings = async () => {
    setLoading(true);
    try {
      const data = await fetchParkings(page);
      setParkings(data.data);
      setPages(data.pages);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadParkings();
  }, [page]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateParking(editingId, formData);
      } else {
        await createParking(formData);
      }
      setFormData({ code: "", name: "", location: "", spaces: "", fee: "" });
      setEditingId(null);
      loadParkings();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (parking) => {
    setFormData({
      code: parking.code,
      name: parking.name,
      location: parking.location,
      spaces: parking.spaces,
      fee: parking.fee,
    });
    setEditingId(parking.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this parking?")) return;
    try {
      await deleteParking(id);
      loadParkings();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const nextPage = () => page < pages && setPage((p) => p + 1);
  const prevPage = () => page > 1 && setPage((p) => p - 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-[#1A6A6E]">Parking Spaces</h1>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2 bg-gray-50 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{editingId ? "Edit Parking" : "Add Parking"}</h2>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Code"
            required
            className="input-field"
          />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="input-field"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="input-field"
          />
          <input
            name="spaces"
            type="number"
            value={formData.spaces}
            onChange={handleChange}
            placeholder="Spaces"
            required
            className="input-field"
          />
          <input
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleChange}
            placeholder="Fee per hour (RWF)"
            required
            className="input-field"
          />
          <button type="submit" className="bg-[#1A6A6E] text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ code: "", name: "", location: "", spaces: "", fee: "" });
              }}
              className="ml-2 text-red-600"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full text-left bg-white border rounded-lg shadow">
          <thead className="bg-[#1A6A6E] text-white">
            <tr>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Spaces</th>
              <th className="px-4 py-2">Fee/hr</th>
              {isAdmin && <th className="px-4 py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {parkings.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{p.code}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.location}</td>
                <td className="px-4 py-2">{p.spaces}</td>
                <td className="px-4 py-2">{p.fee} RWF</td>
                {isAdmin && (
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-[#1A6A6E] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === pages}
          className="bg-[#1A6A6E] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ParkingList;
