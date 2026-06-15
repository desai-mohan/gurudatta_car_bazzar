import React, { useState } from "react";

const SLIDE_LABELS = ["FRONT", "BACK", "LEFT SIDE", "RIGHT SIDE"];
const ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE;
export default function CarCard({ car, onMorePics, adminAuthed }) {
  const slides = [
    car.frontImage,
    car.backImage,
    car.leftImage,
    car.rightImage,
  ].filter(Boolean);

  const [current, setCurrent] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent((i) => (i === slides.length - 1 ? 0 : i + 1));
  };

  const placeholder = "https://placehold.co/400x220?text=No+Image";

  return (
    <div className="car-card">
      {/* SLIDESHOW */}
      <div className="slideshow">
        {slides.length > 0 ? (
          slides.map((src, i) => (
            <img
              key={i}
              src={`http://localhost:5000${src}`}
              alt={SLIDE_LABELS[i] || "Car"}
              className={i === current ? "active" : ""}
            />
          ))
        ) : (
          <img src={placeholder} alt="No image" className="active" />
        )}

        {slides.length > 1 && (
          <>
            <button className="slide-nav prev" onClick={prev}>
              ‹
            </button>
            <button className="slide-nav next" onClick={next}>
              ›
            </button>
            <div className="slide-dots">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === current ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {slides.length > 0 && (
          <div className="slide-label">{SLIDE_LABELS[current] || "VIEW"}</div>
        )}

        {car.financeAvailable && <div className="finance-badge">✓ Finance</div>}
      </div>

      {/* CARD BODY */}
      <div className="card-body">
        <div className="car-name">
          {car.name} {car.model}
        </div>
        <div className="car-price">
          ₹ {Number(car.price).toLocaleString("en-IN")}
        </div>

        <div className="car-specs">
          <div className="spec-item">
            <div className="spec-label">Year</div>
            <div className="spec-value">{car.year}</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">KM Driven</div>
            <div className="spec-value">
              {Number(car.km).toLocaleString("en-IN")}
            </div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Fuel</div>
            <div className="spec-value">{car.fuel}</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Owner</div>
            <div className="spec-value">{car.owner}</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Transmission</div>
            <div className="spec-value">{car.transmission}</div>
          </div>
          <div className="spec-item">
            <div className="spec-label">Color</div>
            <div className="spec-value">{car.color}</div>
          </div>
        </div>

        {/* TIRE CONDITION BAR */}
        <div className="tire-bar-wrap">
          <div className="tire-bar-label">
            <span>Tyre Condition</span>
            <span style={{ color: "var(--gold)" }}>{car.tireCondition}%</span>
          </div>
          <div className="tire-bar">
            <div
              className="tire-fill"
              style={{ width: `${car.tireCondition}%` }}
            />
          </div>
        </div>

        <div className="card-actions">
          <a
            href={`tel:${ADMIN_PHONE}`}
            style={{ flex: 1, textDecoration: "none" }}
          >
            <button className="btn-call" style={{ width: "100%" }}>
              📞 Call Now
            </button>
            {adminAuthed && <button className="btn-delete">DELETE</button>}
          </a>
          <button className="btn-more" onClick={onMorePics}>
            More Pics
          </button>
        </div>
      </div>
    </div>
  );
}
