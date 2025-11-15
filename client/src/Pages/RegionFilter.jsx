// client/src/Pages/RegionFilter.jsx
import React from "react";

// Hardcoded list of all 50 US states
const STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

// RegionFilter: State dropdown (required)
// - Controlled by `stateCode` (2-letter)
// - Not responsible for validation or API calls
export default function RegionFilter({ stateCode, onStateChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label
        htmlFor="state-select"
        style={{ fontSize: "0.85rem", fontWeight: 500 }}
      >
        State <span style={{ color: "red" }}>*</span>
      </label>

      <select
        id="state-select"
        value={stateCode}
        onChange={(e) => onStateChange(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #d1d5db",
          fontSize: "0.9rem",
          maxWidth: "300px",
        }}
      >
        <option value="">Select a state</option>
        {STATES.map((state) => (
          <option key={state.code} value={state.code}>
            {state.name} ({state.code})
          </option>
        ))}
      </select>

      <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
        Required. We use this state along with the city to look up food banks.
      </span>
    </div>
  );
}
