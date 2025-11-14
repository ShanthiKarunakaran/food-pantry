import React, { useState, useEffect } from "react";
import Header from "/";


function App() {

  return (
    <>
     <div>
      < Header navbarSpot={<Navbar/>}/>
      <Footer />
    </div>
    </>
  );
}

export default App;
