import React from "react";
import "./FormPage.css";
import Form from "../Components/Form";

export default function FormPage() {
  return (
    <div className="container">
      <h1> Food Banks Sign Up Here! </h1>
      <div className="content-block image-box">
        <img
          src="images/pexels-fotios-photos-3978831.jpg"
          alt="Shelves stocked with specialized food items"
        />
      </div>
      <h3>
        Food banks, sign up below to join our inventory program and support the
        movement to bring fresh, healthy food to those experiencing homelessness
        and those in need. Here, you can easily track what’s in stock and share
        your offerings with the community. By keeping your information updated,
        future customers can see what you have available—so they can choose your
        food bank and access the nourishment they need to live healthier lives.
      </h3>
      <Form />
    </div>
  );
}
//comment here
