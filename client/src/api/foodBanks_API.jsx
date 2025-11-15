// src/api/foodbanks_API.js

//make API call to rapidapi to get food bank data
export async function fetchFoodBanks_API({
    city,
    state,
    type = "foodbank", // optional; default to foodbank for your app
  }) {
    {/*if (!city || !state) {
      throw new Error("city and state are required");
    }*/}
  
    const baseUrl = import.meta.env.VITE_RAPIDAPI_BASE_URL;
    console.log("Base URL:", baseUrl); 

    const url = new URL(`${baseUrl}/resources`);
  
  
    // required params
    url.searchParams.set("city", city);
    url.searchParams.set("state", state);
  
    // optional param
    if (type) {
      url.searchParams.set("type", type); // "foodbank" or "shelter"
    }
  
    
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
      },
    });
  
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${res.status} ${text}`);
    }
  
    return await res.json();
  }