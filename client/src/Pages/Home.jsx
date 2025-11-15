// client/src/Pages/Home.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import DietFilter from "./DietFilter";

import FoodPantryCard from "./FoodPantryCard";

import { fetchFoodBanks_API } from "../api/foodBanks_API";

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

  // Soft check for "looks like a food bank"
  const isFoodBankType = (typeValue) => {
    const t = (typeValue || "").toLowerCase();
    // Be forgiving: treat anything containing "food" as a foodbank
    // (e.g. "Food Bank", "Food Pantry", "Food distribution")
    return t.includes("food");
  };

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
        type: "foodbank"
        //diet: diet, // pass diet filter to API
      });

      console.log("API sample record:", apiData[0]);

      console.log("RAW API DATA (length):", apiData.length);
      console.log("RAW SAMPLE:", apiData[0]);

      // 2. Keep only foodbank-like entries
      let onlyFoodbanks = apiData.filter((item) => isFoodBankType(item.type));

      // If our filter is too strict and removes everything,
      // fall back to the original data so we don't show an
      // empty page when there *are* results.
      /*if (onlyFoodbanks.length === 0) {
        onlyFoodbanks = apiData;
      }*/

      // 3. Optional name filter on top of that
      if (trimmedName) {
        const term = trimmedName.toLowerCase();
        filtered = apiData.filter((item) => {
          const name = (item.name || item.shelter_name || "").toLowerCase();
          return name.includes(term);
        });
      }

      //temp: for testing the API before any filter is applied, sho entire result
      //setResults(apiData);
      setResults(onlyFoodbanks);
    } catch (err) {
      console.error(err);

      // If API says "City not found", treat it as "no results",
      // not as a scary red error.
      const message = err.message || "";
      if (message.includes("City not found")) {
        setResults([]);
        setError(""); // no error, just empty results
      } else {
        setError(message || "Something went wrong while fetching data.");
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to the FoodBank Home Page
      </h1>

      {/* Main form: City (required), Foodbank name (optional), State (required) , dummy comment*/}
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

          {/* New “page-like” component for dietary filter */}
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
