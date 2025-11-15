import React from "react";
import "./About.css";
export default function About() {
  return (
    <>
      <div className="page-container">
        <main>
          <div className="mission-grid">
            <div className="mission-statement">
              <h2>OUR MISSION: FOOD AS A FOUNDATION</h2>
              <p>
                Connecting immediate food access with long-term health and
                stability.
              </p>
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block text-box">
              <h3>1. Recognizing the Overlap</h3>
              <p>
                People experiencing homelessness face overlapping challenges:
                food insecurity, housing instability, and declining health. We
                understand that access to **consistent, nutritious food** isn't
                a secondary concern—it's the foundation for any path toward
                recovery and stability.
              </p>
              <p>
                (Text to be provided via Slack: Emphasize the connection between
                stable shelter and nutrition.)
              </p>
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block image-box">
              <img
                // CHANGED: Using the exact file path and name from your structure
                src="images/pexels-julia-m-cameron-6994944.jpg"
                alt="Hands and tomato basket"
              />
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block image-box">
              <img
                src="images/pexels-enginakyurt-1435904.jpg"
                alt="Healthy food options"
              />
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block text-box">
              <h3>2. Nutrition for Mental Health</h3>
              <p>
                Poor diet quality and micronutrient deficiencies are common
                among those without stable housing. When basic nutritional needs
                aren't met, both physical and **mental health** are severely
                impacted.
              </p>
              <p>
                Our Food Pantry directly targets this issue, as evidence shows
                food insecurity is strongly associated with anxiety, depression,
                and other mental health challenges. **We use food to fuel
                stability.**
              </p>
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block text-box">
              <h3>3. Beyond Basic Calories: Specialized Care</h3>
              <p>
                We recognize that a standard food bank offering often fails
                those with specific needs, such as chronic conditions or
                restricted diets (like celiac). We strive to be a lifeline,
                ensuring the food we provide is **appropriate, high-quality, and
                supports genuine medical needs**, contributing directly to
                better mental and physical outcomes.
              </p>
            </div>
            {/* Updated: aboutcard -> content-block */}
            <div className="content-block image-box">
              <img
                src="images/joel-muniz-y3ZY6qFln_g-unsplash.jpg"
                alt="Shelves stocked with specialized food items"
              />
            </div>
          </div>
          {/* Updated: aboutcard -> content-block */}
          <div>
            <div class="team-profiles">
              <h2>Our Dedicated Team and Contributions</h2>
              <p classname="the-mission">
                This mission is made possible by a compassionate team committed
                to treating hunger as a complex health issue. Learn more about
                the people driving our strategy and daily operations.
              </p>
              <div class="team-member">
                <h3>LaJoie (Project Manager & Technical Architect)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> Project Management, Project
                    Framework, Technical Architecture, CSS Design.
                  </li>
                  <li>
                    <strong>Page Deliverables:</strong> Inventory Page, Contact
                    Page.
                  </li>
                </ul>
              </div>
              <div class="team-member">
                <h3>Shanthi (Front-End Developer)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> Front-End Development, Feature
                    Implementation For Home Page.
                  </li>
                  <li>
                    <strong>Page Deliverables:</strong> Home Page, foundational
                    filtering systems.
                  </li>
                </ul>
              </div>
              <div class="team-member">
                <h3>Rachel (Front-End Developer)</h3>
                <ul>
                  <li>
                    <strong>Page Deliverables:</strong> Dedicated development of
                    the Form Page.
                  </li>
                </ul>
              </div>
              <div class="team-member">
                <h3>Nicole (Back-End/Full-Stack Developer)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> Back-End Architecture and data logic.
                  </li>
                  <li>
                    <strong>Page Deliverables:</strong> Inventory Page backend
                    integration.
                  </li>
                </ul>
                {/* asdf */}
              </div>
              <div class="team-member">
                <h3>Xavier (UI/UX Developer)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> UI/UX Development, Core CSS Styling.
                  </li>
                  <li>
                    <strong>Deliverables:</strong> Navbar, Header, Footer.
                  </li>
                </ul>
              </div>
              <div class="team-member">
                <h3>Tamara (Content Developer/Front-End)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> Content and Front-End Development.
                  </li>
                  <li>
                    <strong>Page Deliverables:</strong> Home Page, About Page.
                  </li>
                </ul>
              </div>
              <div class="team-member">
                <h3>Arciee (Page Builder & Frame Constultant)</h3>
                <ul>
                  <li>
                    <strong>Role:</strong> Built the Contact Page and cnosulted
                    with Lajoie on the wire frames.
                  </li>
                </ul>
              </div>
            </div>
            {/* Call to Action */}
          </div>
        </main>
      </div>
      ;
    </>
  );
}
