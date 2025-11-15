// client/src/Pages/FoodPantryCard.jsx
import React from "react";

// Expects a single food bank object from YOUR backend:
// {
//   id,
//   name,
//   address,
//   phone,
//   hours,
//   website,
//   bio,
//   city,
//   state
// }

export default function FoodPantryCard({ pantry }) {
  const { name, address, phone, hours, website, bio, city, state } = pantry;

  const displayName = name || "Food bank";

  const locationLine = [address, city, state].filter(Boolean).join(", ");

  return (
    <article
      className="pantry-card"
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem",
        padding: "0.9rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        backgroundColor: "white",
      }}
    >
      {/* Name */}
      <h2
        className="pantry-card__title"
        style={{
          margin: 0,
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {displayName}
      </h2>

      {/* Location */}
      {locationLine && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "#4b5563",
            margin: 0,
          }}
        >
          📍 {locationLine}
        </p>
      )}

      {/* Hours */}
      {hours && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#374151",
            margin: 0,
          }}
        >
          ⏰ Hours: {hours}
        </p>
      )}

      {/* Bio / description */}
      {bio && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#6b7280",
            margin: 0,
          }}
        >
          {bio}
        </p>
      )}

      {/* Contact info */}
      {phone && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#374151",
            margin: 0,
          }}
        >
          📞{" "}
          <a
            href={`tel:${phone}`}
            style={{ textDecoration: "underline" }}
          >
            {phone}
          </a>
        </p>
      )}

      {website && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "#374151",
            margin: 0,
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
    </article>
  );
}
