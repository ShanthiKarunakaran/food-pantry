import React from "react";
import { Navbar } from "../Components/Navbar";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

export default function Contact() {
  return (
    <div className="container">
      <Navbar />
      <Header />
      <body>
        <FoodForm />
      </body>
      <Footer />
    </div>
  );
}
