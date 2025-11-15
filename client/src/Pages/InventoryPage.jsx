import React from "react";
import "./InventoryPage.css";

export default function InventoryPage() {
  const loggedInFoodBank = {
    name: "Mama's Kitchen",
    address: "3960 Home Ave, San Diego, CA 92105, United States",
    phone: "6192336262",
    hours: "Friday 9-5",
    website: "http://www.mamaskitchen.org/",
    bio: "Mamas Kitchen, a community-driven organization, believes that everyone is entitled to nutritious food. Their services improve the lives of women, men, and children.",
    city: "San Diego",
    state: "California",
    image: "images/pexels-rdne-6646916.jpg",
  };

  return (
    <section className="inventory-wrapper">
      <div className="inventory-inner">
        {/* LEFT SIDE */}
        <div className="inventory-left">
          <h1 className="inventory-title">Your Food Bank Profile</h1>

          <div className="inventory-info">
            <p>
              <strong>Name:</strong> {loggedInFoodBank.name}
            </p>
            <p>
              <strong>Address:</strong> {loggedInFoodBank.address}
            </p>
            <p>
              <strong>City:</strong> {loggedInFoodBank.city}
            </p>
            <p>
              <strong>State:</strong> {loggedInFoodBank.state}
            </p>
            <p>
              <strong>Phone Number:</strong> {loggedInFoodBank.phone}
            </p>
            <p>
              <strong>Hours:</strong> {loggedInFoodBank.hours}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={loggedInFoodBank.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {loggedInFoodBank.website}
              </a>
            </p>
            <p>
              <strong>Bio:</strong> {loggedInFoodBank.bio}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE CARD */}
        <div className="inventory-right">
          <div className="inventory-card">
            <img
              src={loggedInFoodBank.image}
              alt="Food Bank"
              className="inventory-image"
            />

            <div className="inventory-card-footer">
              <div>
                <p className="inventory-card-label">Food Bank</p>
                <p className="inventory-card-name">{loggedInFoodBank.name}</p>
              </div>
              <p className="inventory-card-status">Profile Active</p>
            </div>

            {/* Optional floating badges */}
            <div className="inventory-badge badge-top-left">🍎 Fresh Food</div>
            <div className="inventory-badge badge-top-right">🌱 Healthy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
