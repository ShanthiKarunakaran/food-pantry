import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import InventoryPage from "../Pages/InventoryPage";

export function Navbar() {
  //Editing conflicts
    return (
        <>
        <div className='foodHeader'>
      <nav>
        <ul className='navBar'>
          <li>
            <Link to="/"><h2 style={{}}>Home</h2></Link>
          </li>
          <li>
            <Link to="/about-page">About Page</Link>
          </li>
          <li>
            <Link to="/food-bank-inventory"><h2 style={{}}>Food Bank Inventory</h2></Link>
          </li>
          <li>
            <Link to="/contact-us"><h2 style={{}}>Contact Us</h2></Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about-page" element={<About/>} />
        <Route path="/about-page" element={<About/>} />
        <Route path="/food-bank-inventory" element={<InventoryPage/>} />
        <Route path="/contact-us" element={<Contact/>} />
        <Route path="/contact-us" element={<Contact/>} />
        </Routes>
      </div>
    </>
  );
}
