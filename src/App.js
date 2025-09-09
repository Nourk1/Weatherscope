import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  
  const API_KEY = "619c577e994305d07e3269c1eaa4eb30";
  
  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      console.error("Weather API error:", err.response ? err.response.data : err.message);
      setError("Oops! Can't find that city 🥺");
      setWeather(null);
    }
  };

  return (
    <div style={{ 
      fontFamily: "Comic Sans MS, Arial", 
      textAlign: "center", 
      marginTop: "40px",
      background: "linear-gradient(135deg, #74b9ff, #0984e3)",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "white", fontSize: "2.5em", marginBottom: "30px" }}>
        ☀️ Weatherscope ☀️
      </h1>
      
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        maxWidth: "400px",
        margin: "0 auto",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <input
          type="text"
          placeholder="Which city? 🏙️"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ 
            padding: "15px", 
            fontSize: "16px",
            borderRadius: "25px",
            border: "2px solid #74b9ff",
            width: "200px",
            outline: "none"
          }}
        />
        <br/><br/>
        <button
          onClick={getWeather}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            borderRadius: "25px",
            border: "none",
            background: "#fd79a8",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Get Weather! 🌈
        </button>

        {error && (
          <p style={{ 
            color: "#e17055", 
            marginTop: "20px", 
            fontSize: "18px",
            fontWeight: "bold"
          }}>
            {error}
          </p>
        )}

        {weather && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
            borderRadius: "15px",
            border: "3px solid #fd79a8"
          }}>
            <h2 style={{ color: "#2d3436", marginBottom: "20px" }}>
              📍 {weather.name}
            </h2>
            <div style={{ fontSize: "18px", lineHeight: "1.8" }}>
              <p>🌡️ <strong>{weather.main.temp}°C</strong></p>
              <p>☁️ <strong>{weather.weather[0].description}</strong></p>
              <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
              <p>💨 Wind: <strong>{weather.wind.speed} m/s</strong></p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              style={{ 
                marginTop: "10px",
                background: "white",
                borderRadius: "50%",
                padding: "10px"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;