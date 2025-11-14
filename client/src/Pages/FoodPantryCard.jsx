// client/src/Pages/FoodPantryCard.jsx
import React from "react";

// Expects a single food pantry object from the API:
// {
//   name, shelter_name, city, state_abbreviation, full_address,
//   description, phone_number, website, type, distance
// }

export default function FoodPantryCard({ pantry }) {
  const {
    name,
    shelter_name,
    description,
    full_address,
    city,
    state_abbreviation,
    zipcode,
    phone_number,
    website,
    type,
    distance,
  } = pantry;

  const displayName = name || shelter_name || "Food bank";
  const locationLine =
    full_address ||
    `${city || ""}${city && state_abbreviation ? ", " : ""}${
      state_abbreviation || ""
    } ${zipcode || ""}`.trim();

  const distanceLabel =
    typeof distance === "number"
      ? `${distance.toFixed(1)} mi away`  
      : null;

  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "0.75rem 1rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        display: "flex",
        justifyContent: "space-between",
        gap: "0.75rem",
      }}
    >
      {/* Left section: name, location, description, contact */}
      <div style={{ flex: 1 }}>
        <h2
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            marginBottom: "0.25rem",
          }}
        >
          {displayName}
        </h2>

        {locationLine && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "#4b5563",
              margin: 0,
            }}
          >
            {locationLine}
          </p>
        )}

        {description && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "#6b7280",
              marginTop: "0.25rem",
              marginBottom: 0,
            }}
          >
            {description}
          </p>
        )}

        {phone_number && (
          <p
            style={{
              fontSize: "0.78rem",
              color: "#374151",
              marginTop: "0.4rem",
              marginBottom: 0,
            }}
          >
            📞{" "}
            <a
              href={`tel:${phone_number}`}
              style={{ textDecoration: "underline" }}
            >
              {phone_number}
            </a>
          </p>
        )}

        {website && (
          <p
            style={{
              fontSize: "0.78rem",
              color: "#374151",
              marginTop: "0.1rem",
              marginBottom: 0,
            }}
          >
            🌐{" "}
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Website
            </a>
          </p>
        )}
      </div>

      {/* Right section: type, distance, CTA */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.35rem",
          minWidth: "90px",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            padding: "0.1rem 0.5rem",
            borderRadius: "999px",
            backgroundColor: "#f3f4f6",
            textTransform: "uppercase",
          }}
        >
          {type || "foodbank"}
        </span>

        {distanceLabel && (
          <span
            style={{
              fontSize: "0.7rem",
              color: "#6b7280",
            }}
          >
            {distanceLabel}
          </span>
        )}

        <button
          type="button"
          style={{
            marginTop: "0.3rem",
            fontSize: "0.75rem",
            padding: "0.3rem 0.7rem",
            borderRadius: "999px",
            border: "1px solid #111827",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          View details
        </button>
      </div>
    </article>
  );
}






{/*import React from "react";

function FoodPantryCard({ bank }) {
  return (
    <div className="food-bank-card">
      <h3>{bank.name}</h3>
      <p>Address: {bank.address}</p>
      <p>Hours: {bank.hours}</p>

      <p>
        Dietary Options:
        <strong>{bank.dietary.join(", ")}</strong>
      </p>

      <p style={{ fontSize: "0.9em", color: "#888" }}>Region: {bank.region}</p>
    </div>
  );
}

export default FoodPantryCard;*/}
