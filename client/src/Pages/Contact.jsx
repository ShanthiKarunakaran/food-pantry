import React from "react";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <div className="container">
        <Header />

        <main className="contactmain">
          <h1>Contact Us</h1>

          <div className="contact-card">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Asia" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Asia@gmail.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="123-456-789"
                  maxLength="13"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="comment">Tell Us More!</label>
                <textarea id="comment" rows="4"></textarea>
              </div>

              <button type="submit" className="contact-submit">
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
