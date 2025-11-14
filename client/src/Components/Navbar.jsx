import react from "react";

export function Navbar() {
  //Whoops
  return (
    <>
      <div className="foodHeader">
        <nav>
          <ul className="navBar">
            <li>
              <Link to="/">
                <h2 style={{}}>Home</h2>
              </Link>
            </li>
            <li>
              <Link to="/about-page">About Page</Link>
            </li>
            <li>
              <Link to="/food-bank-inventory">
                <h2 style={{}}>Food Bank Inventory</h2>
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
          <Route path="/about-page" element={"Plaeholder for about section"} />
          <Route path="/food-bank-inventory" element={<InventoryPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}
