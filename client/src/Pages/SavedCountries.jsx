import React, { useState, useEffect } from "react";
import CountryCard from "./FoodPantryCard";

export default function SavedCountries({ countries }) {
  console.log(countries, "countries prop saved countries");
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // this holds the current state of the form inputs
  const [formData, setFormData] = useState(emptyFormState);
  // this holds the user's profile information, if a user previously submitted the form
  const [userInfo, setUserInfo] = useState("");
  // here i am creating a usestate to hold the saved countries list
  const [savedCountries, setSavedCountries] = useState([]);

  // Update the state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Step 1: Declare a new function called storeUserData() which should send a POST request to the APT to the /add-one-user endpoint
  // Step 2: Call the storeUserData() function on submit

  const storeUserData = async () => {
    // when we call the fetch() function, we only need to pass in the API url as one parameter when it's a GET request
    // but hen we need to make a POST request, we have to pass in a second parameter: an object
    await fetch("/api/add-one-user", {
      method: "POST", // we need to say we're sending a POST request because by default it's always a GET request
      headers: {
        // the headers is where we put metadata about our request, includeing the data type that we pass in the body
        // in this case we are saying we're  passing in JSON data in the body
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        country_name: formData.country,
        bio: formData.bio,
      }),
    });
    // we aren't gonna do anything with the response so we won't write any further code
    // however if you do want to do something with the response (like when you will update the counter ) you need to do what we did with the fetch call (get the information), turn it into JSON and then it can be used.
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData, "form was submitted");

    // storing the form data into local storage:
    storeUserData(formData);

    setUserInfo(formData);
    // reset the form to empty state
    setFormData(emptyFormState);
  };

  // Step 1: Make a function called getNewestUser() that will get the form data from the API by sending a GET request to the /get-newest-user-endpoint

  // Step 2: Save the form data in a state variable using useState()

  const getNewestUser = async () => {
    // declare a variable that will hold the response from the GET request to /get-newest-user
    const response = await fetch("/api/get-newest-user");
    // turn the response into json format
    const data = await response.json();
    console.log(data);
    const newestUserFromAPI = data[0];
    // save the data in state
    setUserInfo({
      fullName: newestUserFromAPI.name,
      email: newestUserFromAPI.email,
      country: newestUserFromAPI.country_name,
      bio: newestUserFromAPI.bio,
    });
  };

  // .includes is considered a loop
  // add alphebteical order

  const getAllSavedCountries = async () => {
    // declare a variable that will hold the response from the GET request to API endpoint /get-all-saved-countries
    const response = await fetch("/api/get-all-saved-countries");
    // we're taking the raw data from the API and converting it into a js object
    // the response.json() turns the response object into the data we can use in out JS code
    const savedCountriesData = await response.json();
    // we are setting the savedcountries state and saving all of the data as an array of objects (it's already )
    setSavedCountries(savedCountriesData);
  };

  // i'm creating the variable savedCountryItems to map through savedCountries (passing through each country name that is saved in SavedName) the return the countries that are found using .find
  //using an arrow function we are passing through an item and checking if that item's common name (from the countries list passed through in the .find) matches the savedNames that we passed through in the .map.

  const savedCountryItems = savedCountries.map((savedName) => {
    return countries.find(
      (item) => item.name.common === savedName.country_name
    );
  });

  console.log("savedCountryItems", savedCountryItems);
  // run this useEffect once the page loads and call the fucntions getNewestUser and getAllSavedCountries.
  useEffect(() => {
    getNewestUser();
    getAllSavedCountries();
  }, []);

  return (
    <>
      <main className="page">
        <section className="section">
          <h2>My Saved Countries</h2>
          <div className="saved-list">
            {savedCountryItems.map((country, key) => (
              <CountryCard key={key} country={country} />
            ))}
          </div>
        </section>
        {userInfo && <h2>Welcome {userInfo.fullName}!</h2>}
        <section className="section">
          <h2>My Profile</h2>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="fullName"
                className="sr-only"
                value={formData.fullName}
                onChange={handleInputChange}
                id="fullName"
                type="text"
                placeholder="Full Name"
              />
            </div>

            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <textarea
                type="text"
                id="bio"
                name="bio"
                rows="6"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
