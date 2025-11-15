import "./App.css";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import FormPage from "./Pages/FormPage.jsx";
import InventoryPage from "./Pages/InventoryPage.jsx";
import Contact from "./Pages/Contact.jsx";
import { Header } from "./Components/Header.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <>
      <div>
        <nav>
          <ul className="navBar">
            <li>
              <img
                className="navbar-logo"
                style={{ height: "50px" }}
                src="images/logo5.svg"
                alt="Shelves stocked with specialized food items"
              />
            </li>
            <li>
              <Link to="/">
                <h2 style={{}}>Home</h2>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <h2 style={{}}>About</h2>
              </Link>
            </li>
            <li>
              <Link to="/form">
                <h2 style={{}}>Sign Up </h2>
              </Link>
            </li>
            <li>
              <Link to="/food-bank-inventory">
                <h2 style={{}}>Login</h2>
              </Link>
            </li>
            <li>
              <Link to="/contact-us">
                <h2 style={{}}>Contact Us</h2>
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/food-bank-inventory" element={<InventoryPage />} />
          <Route path="/contact-us" element={<Contact />} />
        </Routes>
        <Header />
        <Footer />
      </div>
    </>
  );
}
