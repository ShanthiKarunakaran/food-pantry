// client/src/Pages/Home.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import DietFilter from "./DietFilter";
import FoodPantryCard from "./FoodPantryCard";

// NEW import – use your own backend API instead of RapidAPI
import { fetchFoodBanksFromSiteAPI } from "../api/siteAPI";

export default function Home() {
  // Form state
  const [city, setCity] = useState("");
  const [foodbankName, setFoodbankName] = useState("");
  const [stateCode, setStateCode] = useState(""); // 2-letter code, e.g. "WA"
  const [diet, setDiet] = useState("");

  // Data / status state
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trimmedCity = city.trim();
  const trimmedName = foodbankName.trim();

  // Button enabled only when:
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
      // Call YOUR backend API (via siteAPI helper)
      const apiData = await fetchFoodBanksFromSiteAPI({
        city: trimmedCity,
        state: stateCode,
        foodbankName: trimmedName,
        diet, // diet value from dropdown
      });

      console.log("Site API data (length):", apiData.length);
      console.log("Sample record:", apiData[0]);

      // siteAPI already filters by city/state/name for now
      setResults(apiData);
    } catch (err) {
      console.error(err);

      const message = err.message || "Something went wrong while fetching data.";
      setError(message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to the FoodBank Home Page
      </h1>

      {/* Main form: City (required), Foodbank name (optional), State (required), Diet */}
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

          <RegionFilter stateCode={stateCode} onStateChange={setStateCode} />

          {/* Dietary filter */}
          <DietFilter diet={diet} onDietChange={setDiet} />
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
            cursor: isSubmitDisabled || isLoading ? "not-allowed" : "pointer",
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

      {/* Results in card layout */}
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
