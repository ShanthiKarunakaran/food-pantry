import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";


export default function App() {
  return (
    <>
     <div>
      < Header navbarSpot={<Navbar/>}/>
      <Footer />
    </div>
    </>
  );

}
