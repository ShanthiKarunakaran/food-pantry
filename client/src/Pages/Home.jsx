import React, { useState, useEffect } from "react";
// import Header from '../Header.jsx'; // 1. COMMENT OUT THE HEADER IMPORT
import SearchBar from "./SearchBar.jsx";
import FoodPantryCard from "./FoodPantryCard.jsx";

// --- TEMPORARY Mock Data ---
const MOCK_FOOD_BANK_DATA = [
  {
    id: 1,
    name: "Community Pantry Central",
    address: "123 Main St, Anytown, CA 90001",
    hours: "Mon-Fri",
    region: "North",
    dietary: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: 2,
    name: "Eastside Food Assistance",
    address: "456 Oak Ave, Anytown, CA 90002",
    hours: "Tue-Sat",
    region: "East",
    dietary: ["Vegan", "Halal"],
  },
  {
    id: 3,
    name: "South End Family Services",
    address: "789 Pine Ln, Anytown, CA 90003",
    hours: "Wed & Fri",
    region: "South",
    dietary: ["Vegetarian"],
  },
  {
    id: 4,
    name: "Westside Family Center",
    address: "990 Pine St, Anytown, CA 90004",
    hours: "Mon-Sat",
    region: "West",
    dietary: ["Gluten-Free"],
  },
];
// --- END MOCK DATA ---

function Home() {
  // 1. STATE for Data and Filters
  const [foodBanks, setFoodBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");

  // 2. EFFECT for API Call (Simulated)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFoodBanks(MOCK_FOOD_BANK_DATA);
      } catch (err) {
        setError("Could not fetch data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. FILTERING LOGIC
  const getFilteredBanks = () => {
    if (isLoading || error) return [];

    let filtered = foodBanks;

    // A. Apply Search Filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (bank) =>
          bank.name.toLowerCase().includes(lowerSearchTerm) ||
          bank.address.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // B. Apply Region Filter
    if (selectedRegion !== "All") {
      filtered = filtered.filter((bank) => bank.region === selectedRegion);
    }

    // C. Apply Diet Filter
    if (selectedDiet !== "All") {
      filtered = filtered.filter((bank) => bank.dietary.includes(selectedDiet));
    }

    return filtered;
  };

  const finalBanks = getFilteredBanks();

  // 4. RENDERING OUTPUT
  const renderContent = () => {
    if (isLoading) {
      return (
        <p style={{ textAlign: "center", padding: "50px" }}>
          Loading food bank data...
        </p>
      );
    }
    if (error) {

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
        <p style={{ color: "red", textAlign: "center", padding: "50px" }}>
          Error loading data: {error}
        </p>
      );
    }
    if (finalBanks.length === 0) {
      return (
        <p style={{ textAlign: "center", padding: "50px" }}>
          No food banks found matching your criteria.
        </p>
      );
    }

    return (
      <section className="food-bank-list">
        {finalBanks.map((bank) => (
          <FoodPantryCard key={bank.id} bank={bank} />
        ))}
      </section>
    );
  };

  return (
    <>
      {/* <Header /> */} {/* 2. COMMENT OUT THE HEADER COMPONENT HERE */}
      <main className="container">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedDiet={selectedDiet}
          setSelectedDiet={setSelectedDiet}
        />

        <hr />

        {renderContent()}
      </main>
      <footer>
        <p>&copy; 2025 Pantry</p>
      </footer>
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

export default Home;
