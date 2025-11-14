// client/src/DietFilter.jsx

import React from "react";

const DIET_OPTIONS = ["All", "Vegetarian", "Vegan", "Gluten-Free", "Halal"];

function DietFilter({ selectedDiet, setSelectedDiet }) {
  const handleDietChange = (e) => {
    setSelectedDiet(e.target.value);
  };

  return (
    <select
      className="diet-filter"
      value={selectedDiet}
      onChange={handleDietChange}
    >
      {DIET_OPTIONS.map((diet) => (
        <option key={diet} value={diet}>
          Filter by Diet: {diet}
        </option>
      ))}
    </select>
  );
}

export default DietFilter;
