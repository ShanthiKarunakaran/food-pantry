import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  console.log(country, "from card");
  const title = country?.name?.common || "Unknown";
  const flagUrl = country?.flags?.png || country?.flags?.svg || "";
  const population = country?.population ?? 0;
  const region = country?.region || "—";

  let capital = country.capital;
  console.log("capital:", capital);
  /*this is displaying different ways of gathering the countries capitol as some countries have multiple capitols
it's saying if hte capitol is an array, string or there is nothing display them
  */

  return (
    <Link className="all-links" to={`/country-detail/${country.name.common}`}>
      <div className="CountryCard">
        <article className="card">
          <img className="card-flag" src={flagUrl} alt={`${title} flag`} />
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <p>
              <strong>Population:</strong> {population.toLocaleString("en-US")}
            </p>
            <p>
              <strong>Region:</strong> {region}
            </p>
            <p>
              <strong>Capital:</strong> {capital}
            </p>
          </div>
        </article>
      </div>
    </Link>
  );
}
