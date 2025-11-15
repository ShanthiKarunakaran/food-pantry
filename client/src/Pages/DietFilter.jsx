import React from "react";

// hard-coded diet options for now
const DIET_OPTIONS = [
  { value: "", label: "Any diet" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "keto", label: "Keto" },
  { value: "glutenfree", label: "Gluten-free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "babyfood", label: "Baby food" },
];

export default function DietFilter({ diet, onDietChange }) {
  return (
    <section className="diet-filter">
      <h2>Dietary filter</h2>

      <div className="form-field">
        <label htmlFor="diet">Select dietary preference</label>
        <select
          id="diet"
          value={diet}
          onChange={(e) => onDietChange(e.target.value)}
        >
          {DIET_OPTIONS.map((opt) => (
            <option key={opt.value || "any"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
