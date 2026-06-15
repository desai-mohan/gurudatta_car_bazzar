import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./components/CarCard";
import AdminPanel from "./components/AdminPanel";
import CarModal from "./components/CarModal";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [toast, setToast] = useState(null);
  const [adminAuthed, setAdminAuthed] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/cars");
      setCars(data);
    } catch {
      showToast("Failed to load cars", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAdminClick = () => {
    if (adminAuthed) {
      setShowAdmin(true);
      return;
    }

    const pwd = prompt("Enter Admin Password:");
    if (pwd == undefined || pwd == "") {
      return;
    }

    const res = axios.post("/api/cars/admin/login", {
      password: pwd,
    });

    if (res.data.success) {
      setAdminAuthed(true);
      setShowAdmin(true);
    }
  };

  const handleCarAdded = (newCar) => {
    setCars((prev) => [newCar, ...prev]);
    showToast("🚗 Car added successfully!");
  };

  const handleCarDeleted = (id) => {
    setCars((prev) => prev.filter((c) => c._id !== id));
    showToast("Car deleted.");
  };

  return (
    <div>
      {/* HEADER */}
      <header className="header">
        <div className="header-logo-side">
          <div className="logo-sun">☀️</div>
          <div style={{ display: "none" }}>Logo</div>
        </div>

        <div className="header-center">
          <h1>SRI GURUDATTA CAR BAZZAR</h1>
          <div className="tagline">✦ Finance Available ✦</div>
        </div>

        <div
          className="header-logo-side"
          style={{ justifyContent: "flex-end" }}
        >
          <button className="admin-btn" onClick={handleAdminClick}>
            ⚙ Admin
          </button>
          <div className="logo-sun">☀️</div>
        </div>
      </header>

      {/* HERO */}
      <div className="hero">
        <h2>Find Your Perfect Second Hand Car</h2>
        <p>Quality Pre-Owned Vehicles · Finance Available · Best Prices</p>
      </div>

      {/* CARS */}
      <section className="cars-section">
        <div className="section-title">
          🚗 Available Cars
          <span
            style={{
              fontSize: "1rem",
              color: "#888",
              marginLeft: "auto",
              fontFamily: "Rajdhani",
            }}
          >
            {cars.length} listing{cars.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="loading">Loading Cars...</div>
        ) : cars.length === 0 ? (
          <div className="no-cars">
            <h3>No Cars Listed Yet</h3>
            <p>Check back soon or contact admin to add cars.</p>
          </div>
        ) : (
          <div className="cars-grid">
            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onMorePics={() => setSelectedCar(car)}
              />
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © 2024 <span>Sri Gurudatta Car Bazzar</span> · Finance Available · All
          Rights Reserved
        </p>
      </footer>

      {/* MODALS */}
      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {showAdmin && (
        <AdminPanel
          onClose={() => setShowAdmin(false)}
          onCarAdded={handleCarAdded}
          onCarDeleted={handleCarDeleted}
          cars={cars}
          showToast={showToast}
        />
      )}

      {/* TOAST */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
