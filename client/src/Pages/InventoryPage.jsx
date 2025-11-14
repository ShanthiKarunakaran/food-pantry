import React from "react";
import { Navbar } from "../Components/Navbar";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

export default function InventoryPage({ formData }) {
  return (
    <div className="container">
      <Nav />
      <Header />
      <h1>Food Bank Profile</h1>

      <div className="profile-box">
        <p>
          <strong>Name:</strong> {formData.userName}
        </p>
        <p>
          <strong>Email:</strong> {formData.userEmail}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.userPhone}
        </p>
        <p>
          <strong>URL:</strong> {formData.userUrl}
        </p>
        <p>
          <strong>Organization Name:</strong> {formData.organizationName}
        </p>

        <p>
          <strong>Food Bank Name:</strong> {formData.foodBankName}
        </p>
        <p>
          <strong>Address:</strong> {formData.foodBankAddress}
        </p>
        <p>
          <strong>City:</strong> {formData.foodBankCity}
        </p>
        <p>
          <strong>Zip:</strong> {formData.foodBankZip}
        </p>
        <p>
          <strong>State:</strong> {formData.foodBankState}
        </p>

        <p>
          <strong>Hours:</strong> {formData.foodBankHours}
        </p>
        <p>
          <strong>Bio:</strong> {formData.foodBankBio}
        </p>
      </div>
    </div>
  );
}
