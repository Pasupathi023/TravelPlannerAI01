import React, { useState } from "react";
import { generateTripPlan } from "./api";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    num_days: 5,
    travel_theme: "",
    preferences: "",
    departure_date: "",
    return_date: "",
    hotel_rating: "Any",
    budget: "Economy",
    flight_class: "Economy",
    visa: false,
    insurance: false,
    currency_exchange: false,
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleThemeSelect = (theme) => {
    setFormData({
      ...formData,
      travel_theme: theme,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");

    const response = await generateTripPlan(formData);

    setResult(response?.plan || response?.error || "No response");
    setLoading(false);
  };

  const tripThemes = [
    "Couple Getaway",
    "Family Vacation",
    "Adventure Trip",
    "Solo Exploration",
  ];

  return (
    <div className="app-container">
      <div className="main-layout">
        {/* Left Sidebar - Travel Preferences */}
        <div className="sidebar">
          <h2 className="sidebar-title">Travel Preferences</h2>
          
          <div className="preference-section">
            <label className="preference-label">Budget:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="budget"
                  value="Economy"
                  checked={formData.budget === "Economy"}
                  onChange={handleChange}
                />
                <span>Economy</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="budget"
                  value="Standard"
                  checked={formData.budget === "Standard"}
                  onChange={handleChange}
                />
                <span>Standard</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="budget"
                  value="Luxury"
                  checked={formData.budget === "Luxury"}
                  onChange={handleChange}
                />
                <span>Luxury</span>
              </label>
            </div>
          </div>

          <div className="preference-section">
            <label className="preference-label">Preferred Hotel Rating:</label>
            <select
              name="hotel_rating"
              value={formData.hotel_rating}
              onChange={handleChange}
              className="preference-select"
            >
              <option value="Any">Any</option>
              <option value="3⭐">3⭐</option>
              <option value="4⭐">4⭐</option>
              <option value="5⭐">5⭐</option>
            </select>
          </div>

          <div className="preference-section">
            <label className="preference-label">Flight Class:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="flight_class"
                  value="Economy"
                  checked={formData.flight_class === "Economy"}
                  onChange={handleChange}
                />
                <span>Economy</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="flight_class"
                  value="Business"
                  checked={formData.flight_class === "Business"}
                  onChange={handleChange}
                />
                <span>Business</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="flight_class"
                  value="First Class"
                  checked={formData.flight_class === "First Class"}
                  onChange={handleChange}
                />
                <span>First Class</span>
              </label>
            </div>
          </div>

          <div className="preference-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="visa"
                checked={formData.visa}
                onChange={handleChange}
              />
              <span>Visa Required?</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="insurance"
                checked={formData.insurance}
                onChange={handleChange}
              />
              <span>Travel Insurance?</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="currency_exchange"
                checked={formData.currency_exchange}
                onChange={handleChange}
              />
              <span>Currency Exchange Info?</span>
            </label>
          </div>
        </div>

        {/* Right Section - Trip Details */}
        <div className="main-content">
          <h1 className="main-title">AI Travel Planner</h1>
          
          <div className="trip-details-section">
            <h2 className="section-title">Trip Details</h2>
            
            <div className="form-group">
              <label className="form-label">Departure City:</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter departure city"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Destination:</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter destination"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trip Duration (days):</label>
              <input
                type="number"
                name="num_days"
                value={formData.num_days}
                onChange={handleChange}
                className="form-input"
                min="1"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Travel Theme:</label>
              <div className="theme-cards">
                {tripThemes.map((theme) => (
                  <div
                    key={theme}
                    className={`theme-card ${
                      formData.travel_theme === theme ? "selected" : ""
                    }`}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    {theme}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">What activities do you enjoy?</label>
              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describe your preferred activities..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Departure Date:</label>
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Return Date:</label>
              <input
                type="date"
                name="return_date"
                value={formData.return_date}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate My Travel Plan"}
            </button>
          </div>

          {result && (
            <div className="result-section">
              <h2 className="result-title">Your AI-Generated Travel Plan</h2>
              <div className="result-content">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
