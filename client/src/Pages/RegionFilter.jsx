// client/src/RegionFilter.jsx

import React from "react";

const REGION_OPTIONS = ["All", "North", "East", "South", "West"];

function RegionFilter({ selectedRegion, setSelectedRegion }) {
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <select
      className="filter-btn"
      value={selectedRegion}
      onChange={handleRegionChange}
    >
      {REGION_OPTIONS.map((region) => (
        <option key={region} value={region}>
          Filter by Region: {region}
        </option>
      ))}
    </select>
  );
}

export default RegionFilter;
