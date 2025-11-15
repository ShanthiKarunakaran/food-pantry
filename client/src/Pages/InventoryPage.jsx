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
    image: "images/mamas-kitchen-profile.jpg",
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-header-text">
            <h1>{loggedInFoodBank.name}</h1>
            <p className="profile-subtitle">
              Serving {loggedInFoodBank.city}, {loggedInFoodBank.state}
            </p>
          </div>
          <div className="profile-avatar-wrapper">
            <img
              src="/images/pexels-rdne-6646916.jpg "
              alt={`${loggedInFoodBank.name} logo`}
              className="profile-avatar"
            />
          </div>
        </div>

        <div className="profile-meta-grid">
          <p>
            <span className="profile-label">Address</span>
            <span className="profile-value">{loggedInFoodBank.address}</span>
          </p>
          <p>
            <span className="profile-label">Phone</span>
            <span className="profile-value">{loggedInFoodBank.phone}</span>
          </p>
          <p>
            <span className="profile-label">Hours</span>
            <span className="profile-value">{loggedInFoodBank.hours}</span>
          </p>
          <p>
            <span className="profile-label">Website</span>
            <span className="profile-value">
              <a
                href={loggedInFoodBank.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {loggedInFoodBank.website}
              </a>
            </span>
          </p>
        </div>

        <div className="profile-bio">
          <h2>Your Bio</h2>
          <p>{loggedInFoodBank.bio}</p>
        </div>
      </div>
    </div>
  );
}
