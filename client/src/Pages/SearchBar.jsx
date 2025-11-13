// client/src/SearchBar.jsx (Final Corrected Code)

import React from "react";
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
      {/* Main Text Input */}
      <input
        type="text"
        placeholder="Search by Name or Address..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="filter-group">
        {/* Region Filter */}
        <RegionFilter
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />

        {/* Diet Filter */}
        <DietFilter
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
        />

        {/* Additional Placeholder Button */}
        <button className="filter-btn">Additional Filters</button>
      </div>
    </section>
  );
}

export default SearchBar;
