import React from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

export default function Contact() {
  return (
    <div className="container">
      <Navbar />
      <Header />

      <main className="contactmain">
        <h1>Food Pantry Finder</h1>
        <h2>Contact FoodPantry</h2>

        <form className="parentfour">
          <div className="name">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Asia"
              required
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Asia@gmail.com"
              required
            />
          </div>

          <div className="phone">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="123-456-789"
              required
              maxLength="13"
            />
          </div>

          <label htmlFor="comment">Tell Us More!</label>
          <br />
          <textarea id="comment" name="comment" rows="4" cols="40"></textarea>
          <br />
          <br />

          <button type="submit">Submit</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
