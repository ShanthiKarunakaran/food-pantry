import localData from "../../localData.js";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Form from "../Components/Form.jsx";

export default function Home({ countries }) {
  const [searchBar, setSearchBar] = useState("");
  const [selectedRegionDropDown, setSelectedRegionDropDown] = useState("all");

  let filteredCountries = countries || [];

  // Filter by search query
  // here i'm checking if the user has typed something in the search bar
  if (searchBar) {
    // below i am applying a filter to the  filteredCountries array
    filteredCountries = filteredCountries.filter((country) => {
      // for each tounry in hte array you need to 1) get the country's common name then convert it to lowercase and then check if it includes the search text and lowercase it again
      return country.name.common
        .toLowerCase()
        .includes(searchBar.toLowerCase());
    });
  }

  // Filter by region
  // here i am filtering by region. the user can click the drop down and see what the countries that are in the selected region.
  if (selectedRegionDropDown !== "all") {
    // apply another filter to the already-filtered countries
    filteredCountries = filteredCountries.filter((country) => {
      return (
        // for each country get the country's region from the API convert it to lowercase and check to see if it exactly matches the slected dropdown option
        country.region === selectedRegionDropDown
      );
    });
    console.log("filteredCountries:", filteredCountries);
  }

  return (
    <>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="region-filter">
        <select
          value={selectedRegionDropDown}
          onChange={(e) => setSelectedRegionDropDown(e.target.value)}
        >
          <option value="all">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="card-container">
        {/* Below i am looping through the sortedCountries array and displaying a CountryCard for each one */}
        {filteredCountries.map((country) => (
          // I am making a key for each CountryCard using the country’s common name
          <CountryCard key={country.name?.common} country={country} />
        ))}
      </div>

      <Form />
    </>
  );
}
