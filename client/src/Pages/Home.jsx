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
    </>
  );
}

export default Home;
