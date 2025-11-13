import React from "react";

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

export default FoodPantryCard;
