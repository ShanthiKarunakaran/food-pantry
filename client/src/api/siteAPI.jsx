// client/src/api/siteAPI.jsx

// Map dropdown diet values to the backend's boolean column names
// used in /get-all-food-banks-by-category/:category
function mapDietToCategorySlug(diet) {
    switch (diet) {
      case "vegetarian":
        return "isvegetarian";
      case "vegan":
        return "isvegan";
      case "keto":
        return "isketo";
      case "glutenfree":
        return "isglutenfree";
      case "halal":
        return "ishalal";
      case "kosher":
        return "iskosher";
      case "babyfood":
        return "isbabyfood";
      // "" or anything else => no dietary filter
      default:
        return null;
    }
  }
  
  /**
   * Fetch food banks from your own backend.
   *
   * Params:
   *  - city          (string, required in UI but we defensively trim)
   *  - state         (2-letter code like "CA", "ID")
   *  - foodbankName  (optional string, used as name search)
   *  - diet          (one of: "", "vegetarian", "vegan", "keto",
   *                   "glutenfree", "halal", "kosher", "babyfood")
   */
  export async function fetchFoodBanksFromSiteAPI({
    city,
    state,
    foodbankName,
    diet,
  }) {
    const trimmedCity = (city || "").trim();
    const trimmedName = (foodbankName || "").trim();
    const upperState = (state || "").trim().toUpperCase();
  
    const categorySlug = mapDietToCategorySlug(diet);
  
    // You can set VITE_BACKEND_BASE_URL in .env, or it falls back to localhost
    const baseUrl =
      import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:3001";
  
    let url;
  
    // If a diet is selected, hit the category endpoint
    if (categorySlug) {
      url = new URL(
        `${baseUrl}/get-all-food-banks-by-category/${categorySlug}`
      );
    } else {
      // "Any diet" -> all food banks
      url = new URL(`${baseUrl}/get-all-food-banks`);
    }
  
    // Send these as query params so backend can use them later if desired
    if (trimmedCity) url.searchParams.set("city", trimmedCity);
    if (upperState) url.searchParams.set("state", upperState);
    if (trimmedName) url.searchParams.set("name", trimmedName);
  
    const res = await fetch(url.toString(), { method: "GET" });
  
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${res.status} ${text}`);
    }
  
    const data = await res.json(); // Expected: array of food bank objects
  
    // ---------- Client-side filtering for now ----------
  
    let filtered = Array.isArray(data) ? data : [];
  
    if (trimmedCity) {
      const cityLower = trimmedCity.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.city || "").toLowerCase().includes(cityLower)
      );
    }
  
    if (upperState) {
      filtered = filtered.filter(
        (item) => (item.state || "").toUpperCase() === upperState
      );
    }
  
    if (trimmedName) {
      const term = trimmedName.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.name || "").toLowerCase().includes(term)
      );
    }
  
    return filtered;
  }
  