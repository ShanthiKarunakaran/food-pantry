// /src/App.jsx

import React, { useState, useEffect } from 'react';
import Home from "./Pages/Home";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
//import { useState, useEffect } from "react";




// import './style.css'; // Keep this! Global styling

// --- Commented out old project imports to fix the error ---
// import AllCountries from "./Pages/AllCountries.jsx";
// import SavedCountries from "./Pages/SavedCountries.jsx";
// import CountryDetail from "./Pages/CountryDetail.jsx";
// import React, { useState, useEffect } from "react";
// --- End commented out section ---



//import SavedCountries from "./Pages/SavedCountries.jsx";
// import localData from "../../localData.js";


export default function App() {
  return (
    // The App component renders your Home component
    // If you had a Router here, you would temporarily comment it out too.
    <Home />
  );

}

//export default App;



// import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
// import Home from "./Pages/Home.jsx";
// import SavedCountries from "./Pages/SavedCountries.jsx";
// // import localData from "../../localData.js";
// import React, { useState, useEffect } from "react";

// import CountryDetail from "./Pages/CountryDetail.jsx";

// function App() {
//   const [countries, setCountries] = useState([]);
//   //Below we are creating the variable getCountriesData to retreave the country data from the api
//   const getCountriesData = async () => {
//     try {
//       const response = await fetch(
//         "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,cca3,borders"
//       );
//       const data = await response.json();
//       console.log("data from API", data);
//       setCountries(data);
//     } catch (error) {
//       console.log("Error: " + error.message);
//     }
//   };
//   // Here i am sorting the countries by the "common" name in alphabetical order
//   // becuase we are sorting through the countries array this becomes are main variable needed for the .sort method to run (can't be done will all methods, .sort is one othe exceptions (the technical term for this is muttation meaning the original array is changed))
//   const sortedCountries = countries.sort((firstCountry, secondCountry) =>
//     firstCountry.name.common > secondCountry.name.common ? 1 : -1
//   );
//   // we run useEffect when the page loads
//   // it has an empty dependency array, meaning no dependencies, but we still have to include because it's required useEffect syntax

//   // below is the useEffect that will show the getCountriesData on page load
//   useEffect(() => {
//     getCountriesData();
//   }, []);

//   return (
//     <>
//       <div>
//         {/* below is the nav bar stored in the header linking the url to the name of pages that are linked to them. In the home and the savedcountries page we are using the text as the link buttons  */}
//         <header>
//           <nav>
//             <Link to="/" className="homeHeader-link">
//               Where in the world?
//             </Link>

//             <Link to="/SavedCountries" className="savedCountries-link">
//               Saved Countries
//             </Link>
//           </nav>
//         </header>
//         {/* here i am wrapping everything in <Routes> so i can define all the paths in the app
//          */}
//         <Routes>
//           {/* here i am setting the path for the homepage "/" so when the user visits it they see the Home component i'm also also passing the countries data into Home as a prop . I'm usuing a similar method fo the saved countries page route*/}
//           <Route path="/" element={<Home countries={countries} />} />
//           <Route
//             path="/SavedCountries"
//             element={<SavedCountries countries={countries} />}
//           />
//           {/* below i am making a dynamic route for a country detail page. the ":countryName" part is a parameter so when a countryName is clicked it gets shown
// I am also rendering the CountryDetail component when that happens
//   lastly i am passing the countries data AND the getCountriesData function into CountryDetail as props */}
//           <Route
//             path="/country-detail/:countryName"
//             element={
//               <CountryDetail
//                 countries={countries}
//                 getCountriesData={getCountriesData}
//               />
//             }
//           />{" "}
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;
