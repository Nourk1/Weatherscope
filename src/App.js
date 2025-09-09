import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // 🔑 Your working API key
  const API_KEY = "619c577e994305d07e3269c1eaa4eb30";

  const getWeather = async () => {
    try {
      // ✅ Use free `/data/2.5/weather` endpoint
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(res.data);
      setError("");
    } catch (err) {
      console.error("Weather API error:", err.response ? err.response.data : err.message);
      setError("Error fetching weather data.");
      setWeather(null);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "40px" }}>
      <h1>🌤 Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={getWeather}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "inline-block",
            background: "#f9f9f9",
          }}
        >
          <h2>Weather in {weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp}°C</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default App;
