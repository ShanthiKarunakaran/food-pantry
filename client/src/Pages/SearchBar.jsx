import { useEffect, useState } from "react";
import { fetchFoodBanks_API } from "./api/foodBanks_API";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // try a known city/state combo – adjust to something valid for the API
    fetchFoodBanks_API({ city: "seattle", state: "WA", type: "foodbank" })
      .then((res) => {
        console.log("API response:", res);
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Something went wrong");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Testing Food Bank API</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {item.name || item.shelter_name || JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 