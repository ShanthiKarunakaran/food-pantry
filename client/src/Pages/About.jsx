import React from "react";
import { Navbar } from "../Components/Navbar";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
// The invalid 'import { images } from "../../public/images";' is correctly commented out/deleted.

// Start of the functional component
const About = () => {
  return (
    <div className="page-container">
      <Navbar />
      <Header />

      <main>
        <div className="mission-grid">
          <div className="mission-statement">
            <h2>OUR MISSION: FOOD AS A FOUNDATION</h2>
            <p>
              Connecting immediate food access with long-term health and
              stability.
            </p>
          </div>

          <div className="content-block text-box">
            <h3>1. Recognizing the Overlap</h3>
            <p>
              People experiencing homelessness face overlapping challenges: food
              insecurity, housing instability, and declining health. We
              understand that access to **consistent, nutritious food** isn't a
              secondary concern—it's the foundation for any path toward recovery
              and stability.
            </p>
            <p>
              (Text to be provided via Slack: Emphasize the connection between
              stable shelter and nutrition.)
            </p>
          </div>

          <div className="content-block image-box">
            {/* CORRECT PATH 1: Starts with / for public folder */}
            <img
              src="/images/elaine-casap-qgHGDbbSNm8-unsplash.jpg"
              alt="Hands and tomato basket"
            />
          </div>

          <div className="content-block image-box">
            {/* CORRECT PATH 2: Starts with / (even if omitted, browser resolves it) */}
            <img
              src="/images/pexels-enginakyurt-1435904.jpg"
              alt="Healthy food options"
            />
          </div>

          <div className="content-block text-box">
            <h3>2. Nutrition for Mental Health</h3>
            <p>
              Poor diet quality and micronutrient deficiencies are common among
              those without stable housing. When basic nutritional needs aren't
              met, both physical and **mental health** are severely impacted.
            </p>
            <p>
              Our Food Pantry directly targets this issue, as evidence shows
              food insecurity is strongly associated with anxiety, depression,
              and other mental health challenges. **We use food to fuel
              stability.**
            </p>
          </div>

          <div className="content-block text-box">
            <h3>3. Beyond Basic Calories: Specialized Care</h3>
            <p>
              We recognize that a standard food bank offering often fails those
              with specific needs, such as chronic conditions or restricted
              diets (like celiac). We strive to be a lifeline, ensuring the food
              we provide is **appropriate, high-quality, and supports genuine
              medical needs**, contributing directly to better mental and
              physical outcomes.
            </p>
          </div>

          <div className="content-block image-box">
            {/* CORRECT PATH 3 */}
            <img
              src="/images/pexels-pixabay-48817.jpg"
              alt="Shelves stocked with mason jars healthy food"
            />
          </div>

          <div className="content-block team-section">
            <h2>Our Dedicated Team and Contributions</h2>
            <p>
              This mission is made possible by a compassionate team committed to
              treating hunger as a complex health issue. Learn more about the
              people driving our strategy and daily operations.
            </p>
            <p>
              [Detailed team member profiles and contributions to be inserted
              here.]
            </p>
          </div>

          {/* Call to Action */}
          <p>
            <a href="/contact">Get Involved Today</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};
// End of the functional component

// Export the component so it can be used in your router
export default About;
