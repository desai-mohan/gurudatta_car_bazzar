import React, { useState } from "react";

const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE;

export default function CarModal({ car, onClose }) {
  const [lightbox, setLightbox] = useState(null);

  const allImages = [
    ...(car.frontImage ? [{ src: car.frontImage, label: "Front" }] : []),
    ...(car.backImage ? [{ src: car.backImage, label: "Back" }] : []),
    ...(car.leftImage ? [{ src: car.leftImage, label: "Left Side" }] : []),
    ...(car.rightImage ? [{ src: car.rightImage, label: "Right Side" }] : []),
  ];

  const exterior = car.exteriorImages || [];
  const interior = car.interiorImages || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {car.name} {car.model} ({car.year})
          </h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* 4 SIDE VIEWS */}
          {allImages.length > 0 && (
            <div className="pics-section">
              <h3>📸 Main Views</h3>
              <div className="pics-grid">
                {allImages.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img
                      src={`http://localhost:5000${img.src}`}
                      alt={img.label}
                      onClick={() =>
                        setLightbox(`http://localhost:5000${img.src}`)
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: 6,
                        background: "rgba(0,0,0,0.65)",
                        color: "var(--gold-light)",
                        fontSize: "0.68rem",
                        letterSpacing: "1px",
                        padding: "2px 7px",
                        borderRadius: "3px",
                        textTransform: "uppercase",
                      }}
                    >
                      {img.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXTERIOR */}
          {exterior.length > 0 && (
            <div className="pics-section">
              <h3>🚗 Exterior</h3>
              <div className="pics-grid">
                {exterior.map((src, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${src}`}
                    alt={`Exterior ${i + 1}`}
                    onClick={() => setLightbox(`http://localhost:5000${src}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* INTERIOR */}
          {interior.length > 0 && (
            <div className="pics-section">
              <h3>🪑 Interior</h3>
              <div className="pics-grid">
                {interior.map((src, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${src}`}
                    alt={`Interior ${i + 1}`}
                    onClick={() => setLightbox(`http://localhost:5000${src}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CAR DETAILS */}
          <div className="pics-section">
            <h3>📋 Car Details</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                ["Car Name", `${car.name} ${car.model}`],
                ["Year", car.year],
                ["Price", `₹ ${Number(car.price).toLocaleString("en-IN")}`],
                ["KM Driven", Number(car.km).toLocaleString("en-IN")],
                ["Fuel Type", car.fuel],
                ["Transmission", car.transmission],
                ["Color", car.color],
                ["Owner", car.owner],
                ["Tyre Condition", `${car.tireCondition}%`],
                [
                  "Finance",
                  car.financeAvailable ? "✅ Available" : "❌ Not Available",
                ],
              ].map(([label, value]) => (
                <div className="spec-item" key={label}>
                  <div className="spec-label">{label}</div>
                  <div className="spec-value">{value}</div>
                </div>
              ))}
            </div>
            {car.description && (
              <div
                style={{
                  marginTop: 14,
                  padding: "12px 16px",
                  background: "var(--dark3)",
                  borderRadius: 8,
                  color: "#ccc",
                  lineHeight: 1.6,
                }}
              >
                {car.description}
              </div>
            )}
          </div>

          {/* CALL BUTTON */}
          <a href={`tel:${ADMIN_PHONE}`} style={{ textDecoration: "none" }}>
            <button className="modal-call-btn">
              📞 CALL ME — Interested in this Car!
            </button>
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Full view" />
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
