// client/src/Pages/SearchBar.jsx
import React from "react";

// SearchBar handles two inputs:
// 1. City (required) – user must enter at least 3 characters
// 2. Food bank name (optional) – used for client-side filtering
//
// Validation + API calls are handled in Home.jsx.

export default function SearchBar({
  city,
  onCityChange,
  foodbankName,
  onFoodbankNameChange,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
      }}
    >
      {/* City input (required) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label
          htmlFor="city-input"
          style={{ fontSize: "0.85rem", fontWeight: 500 }}
        >
          City <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="city-input"
          type="text"
          placeholder="e.g. Seattle"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            fontSize: "0.9rem",
          }}
        />
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            Required. We use this City along with the State to look up food banks.
        </span>
      </div>

      {/* Food bank name input (optional) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <label
          htmlFor="foodbank-input"
          style={{ fontSize: "0.85rem", fontWeight: 500 }}
        >
          Food bank name{" "}
          <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            (optional)
          </span>
        </label>
        <input
          id="foodbank-input"
          type="text"
          placeholder="e.g. Hope Pantry"
          value={foodbankName}
          onChange={(e) => onFoodbankNameChange(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            fontSize: "0.9rem",
          }}
        />
        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          We’ll filter results by this name if provided.
        </span>
      </div>
    </div>
  );
}







// client/src/SearchBar.jsx (Final Corrected Code)

/*import React from "react";
import RegionFilter from "./RegionFilter";
import DietFilter from "./DietFilter";

function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  selectedDiet,
  setSelectedDiet,
}) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className="filter-bar">
     
      <input
        type="text"
        placeholder="Search by Name or Address..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-group">
       
        <RegionFilter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />

       
        <DietFilter
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
        />

      
        <button className="filter-btn">Additional Filters</button>
      </div>
    </section>
  );
}

export default SearchBar;*/



