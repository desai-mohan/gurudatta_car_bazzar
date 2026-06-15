import React, { useState } from "react";
import axios from "axios";

export default function AdminPanel({
  onClose,
  onCarAdded,
  onCarDeleted,
  cars,
  showToast,
}) {
  const [tab, setTab] = useState("add"); // 'add' | 'manage'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    model: "",
    year: "",
    price: "",
    km: "",
    fuel: "Petrol",
    transmission: "Manual",
    color: "",
    owner: "1st Owner",
    tireCondition: 80,
    financeAvailable: false,
    description: "",
  });
  const [files, setFiles] = useState({
    frontImage: null,
    backImage: null,
    leftImage: null,
    rightImage: null,
    interiorImages: [],
    exteriorImages: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFile = (e) => {
    const { name, files: f } = e.target;
    if (name === "interiorImages" || name === "exteriorImages") {
      setFiles((prev) => ({ ...prev, [name]: Array.from(f) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: f[0] }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.model || !form.year || !form.price) {
      showToast("Please fill required fields!", "error");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (files.frontImage) fd.append("frontImage", files.frontImage);
      if (files.backImage) fd.append("backImage", files.backImage);
      if (files.leftImage) fd.append("leftImage", files.leftImage);
      if (files.rightImage) fd.append("rightImage", files.rightImage);
      files.interiorImages.forEach((f) => fd.append("interiorImages", f));
      files.exteriorImages.forEach((f) => fd.append("exteriorImages", f));

      const { data } = await axios.post("/api/cars", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCarAdded(data);
      // Reset form
      setForm({
        name: "",
        model: "",
        year: "",
        price: "",
        km: "",
        fuel: "Petrol",
        transmission: "Manual",
        color: "",
        owner: "1st Owner",
        tireCondition: 80,
        financeAvailable: false,
        description: "",
      });
      setFiles({
        frontImage: null,
        backImage: null,
        leftImage: null,
        rightImage: null,
        interiorImages: [],
        exteriorImages: [],
      });
    } catch (err) {
      showToast(
        "Error adding car: " + (err.response?.data?.message || err.message),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`/api/cars/${id}`);
      onCarDeleted(id);
    } catch {
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-panel-header">
          <h2>⚙ Admin Panel</h2>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              onClick={() => setTab("add")}
              style={{
                background: tab === "add" ? "var(--gold-dark)" : "transparent",
                border: "1px solid var(--gold-dark)",
                color: tab === "add" ? "var(--dark)" : "var(--gold-light)",
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "Rajdhani",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Add Car
            </button>
            <button
              onClick={() => setTab("manage")}
              style={{
                background:
                  tab === "manage" ? "var(--gold-dark)" : "transparent",
                border: "1px solid var(--gold-dark)",
                color: tab === "manage" ? "var(--dark)" : "var(--gold-light)",
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "Rajdhani",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              Manage ({cars.length})
            </button>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {tab === "add" ? (
          <div className="admin-form">
            <div className="upload-section-label">📝 Basic Info</div>
            <div className="form-row">
              <div className="form-group">
                <label>Car Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Maruti Swift"
                />
              </div>
              <div className="form-group">
                <label>Model *</label>
                <input
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="e.g. VXI"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Year *</label>
                <input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g. 2019"
                />
              </div>
              <div className="form-group">
                <label>Price (₹) *</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 450000"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>KM Driven</label>
                <input
                  name="km"
                  type="number"
                  value={form.km}
                  onChange={handleChange}
                  placeholder="e.g. 45000"
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  placeholder="e.g. White"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fuel Type</label>
                <select name="fuel" value={form.fuel} onChange={handleChange}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>CNG</option>
                  <option>Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                >
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Owner</label>
                <select name="owner" value={form.owner} onChange={handleChange}>
                  <option>1st Owner</option>
                  <option>2nd Owner</option>
                  <option>3rd Owner</option>
                  <option>4th+ Owner</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tyre Condition ({form.tireCondition}%)</label>
                <input
                  name="tireCondition"
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={form.tireCondition}
                  onChange={handleChange}
                  style={{ padding: "12px 0" }}
                />
              </div>
            </div>
            <div className="checkbox-row">
              <input
                type="checkbox"
                name="financeAvailable"
                id="fin"
                checked={form.financeAvailable}
                onChange={handleChange}
              />
              <label htmlFor="fin">Finance Available</label>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Any additional details about the car..."
              />
            </div>

            <div className="upload-section-label">
              📷 Main View Photos (Front / Back / Left / Right)
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Front Image</label>
                <input
                  type="file"
                  name="frontImage"
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
              <div className="form-group">
                <label>Back Image</label>
                <input
                  type="file"
                  name="backImage"
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Left Side Image</label>
                <input
                  type="file"
                  name="leftImage"
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
              <div className="form-group">
                <label>Right Side Image</label>
                <input
                  type="file"
                  name="rightImage"
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
            </div>

            <div className="upload-section-label">
              🖼 More Pics (Interior & Exterior — Multiple)
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Interior Images</label>
                <input
                  type="file"
                  name="interiorImages"
                  accept="image/*"
                  multiple
                  onChange={handleFile}
                />
              </div>
              <div className="form-group">
                <label>Exterior Images</label>
                <input
                  type="file"
                  name="exteriorImages"
                  accept="image/*"
                  multiple
                  onChange={handleFile}
                />
              </div>
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding Car..." : "🚗 Add Car to Listing"}
            </button>
          </div>
        ) : (
          <div style={{ padding: 24 }}>
            {cars.length === 0 ? (
              <div className="no-cars">
                <h3>No cars listed</h3>
              </div>
            ) : (
              cars.map((car) => (
                <div
                  key={car._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    background: "var(--dark3)",
                    borderRadius: 8,
                    marginBottom: 10,
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--white)" }}>
                      {car.name} {car.model}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#888" }}>
                      {car.year} · ₹{Number(car.price).toLocaleString("en-IN")}{" "}
                      · {car.owner}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDelete(car._id, `${car.name} ${car.model}`)
                    }
                    style={{
                      background: "transparent",
                      border: "1px solid #c0392b",
                      color: "#e74c3c",
                      padding: "6px 14px",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontFamily: "Rajdhani",
                      fontSize: "0.9rem",
                      flexShrink: 0,
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
