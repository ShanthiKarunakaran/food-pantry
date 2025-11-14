// client/src/Pages/Home.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import FoodPantryCard from "./FoodPantryCard";


import { fetchFoodBanks_API } from "../api/foodBanks_API";

export default function Home() {
  // Form state
  const [city, setCity] = useState("");
  const [foodbankName, setFoodbankName] = useState("");
  const [stateCode, setStateCode] = useState(""); // 2-letter code, e.g. "WA"

  // Data / status state
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trimmedCity = city.trim();
  const trimmedName = foodbankName.trim();

  // ✅ Button enabled only when:
  // - city is not empty
  // - state is selected
  const isSubmitDisabled = !trimmedCity || !stateCode;

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitDisabled) {
      // Just in case user hits Enter while button is disabled
      return;
    }

    setIsLoading(true);
    setError("");
    setResults([]);

    try {
      // 1. Call external API with required location fields
      const apiData = await fetchFoodBanks_API({
        city: trimmedCity,
        state: stateCode,
        type: "foodbank",
      });

      // 2. Optionally filter by food bank name on the client
      let filtered = apiData;
      if (trimmedName) {
        const term = trimmedName.toLowerCase();
        filtered = apiData.filter((item) => {
          const name =
            (item.name || item.shelter_name || "").toLowerCase();
          return name.includes(term);
        });
      }

      setResults(filtered);
    } catch (err) {
      console.error(err);

      // If API says "City not found", treat it as "no results",
      // not as a scary red error.
      const message = err.message || "";
      if (message.includes("City not found")) {
        setResults([]);
        setError(""); // no error, just empty results
      } else {
        setError(
          message || "Something went wrong while fetching data."
        );
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to the FoodBank Home Page
      </h1>

      {/* Main form: City (required), Foodbank name (optional), State (required) */}
      <form onSubmit={handleSubmit}>
        {/* Top row: search inputs (city + optional food bank name) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "900px",
            marginBottom: "1rem",
          }}
        >
          <SearchBar
            city={city}
            onCityChange={setCity}
            foodbankName={foodbankName}
            onFoodbankNameChange={setFoodbankName}
          />

          <RegionFilter
            stateCode={stateCode}
            onStateChange={setStateCode}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitDisabled || isLoading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor:
              isSubmitDisabled || isLoading ? "#9ca3af" : "#111827",
            color: "white",
            fontSize: "0.9rem",
            cursor:
              isSubmitDisabled || isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Searching..." : "Find food banks"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p style={{ color: "red", marginTop: "1rem", fontSize: "0.9rem" }}>
          Error: {error}
        </p>
      )}

      {/* Results */}
      {/*<ul
        style={{
          listStyle: "none",
          paddingLeft: 0,
          marginTop: "1.5rem",
          maxWidth: "900px",
        }}
      >
        {results.map((item) => (
          <li
            key={item.id || item.name}
            style={{
              padding: "0.75rem 0",
              borderBottom: "1px solid #e5e7eb",
              fontSize: "0.9rem",
            }}
          >
            <strong>{item.name || item.shelter_name}</strong>
            {(item.city || item.state_abbreviation) && (
              <span>
                {` — ${item.city || ""}${
                  item.city && item.state_abbreviation ? ", " : ""
                }${item.state_abbreviation || ""}`}
              </span>
            )}
            {item.full_address && (
              <div style={{ fontSize: "0.8rem", color: "#4b5563" }}>
                {item.full_address}
              </div>
            )}
          </li>
        ))}
      </ul>*/}

      <div
        style={{
          marginTop: "1.5rem",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {results.map((item) => (
          <FoodPantryCard key={item.id || item.name} pantry={item} />
        ))}
      </div>

      {/* No results message (but only after a real attempt) */}
      {!isLoading &&
        !error &&
        results.length === 0 &&
        trimmedCity &&
        stateCode && (
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            No food banks found for “{trimmedCity}, {stateCode}”
            {trimmedName && ` with name containing “${trimmedName}”`}.
          </p>
        )}
    </div>
  );
}




// import Header from '../Header.jsx'; // 1. COMMENT OUT THE HEADER IMPORT


{/*import SearchBar from "./SearchBar.jsx";
import FoodPantryCard from "./FoodPantryCard.jsx";


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


function Home() {
 
  const [foodBanks, setFoodBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedDiet, setSelectedDiet] = useState("All");

  
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

 
  const getFilteredBanks = () => {
    if (isLoading || error) return [];

    let filtered = foodBanks;

   
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (bank) =>
          bank.name.toLowerCase().includes(lowerSearchTerm) ||
          bank.address.toLowerCase().includes(lowerSearchTerm)
      );
    }


    if (selectedRegion !== "All") {
      filtered = filtered.filter((bank) => bank.region === selectedRegion);
    }

   
    if (selectedDiet !== "All") {
      filtered = filtered.filter((bank) => bank.dietary.includes(selectedDiet));
    }

    return filtered;
  };

  const finalBanks = getFilteredBanks();

  
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


  if (searchBar) {
   
    filteredCountries = filteredCountries.filter((country) => {
    
      return country.name.common
        .toLowerCase()
        .includes(searchBar.toLowerCase());
    });
  }

  
  if (selectedRegionDropDown !== "all") {
   
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
      
        {filteredCountries.map((country) => (
         
          <CountryCard key={country.name?.common} country={country} />
        ))}
      </div>

      <Form />
    </>
  );
}

export default Home;*/}
