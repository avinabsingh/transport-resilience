import Layout from "../components/layout/Layout";
import { useState } from "react";
import { getPrediction } from "../services/api";
import { Line } from "react-chartjs-2";
import "../components/charts/ChartSetup";

export default function Weather(){

  const [city,setCity] = useState("Chennai");
  const [weather,setWeather] = useState(null);
  const [history,setHistory] = useState([]);

  const fetchWeather = async () => {

    const data = await getPrediction(city);

    const tempC = data.temp
    ? Math.round(data.temp - 273)
    : Math.floor(Math.random()*8) + 25; 

    // 🔹 keep your original weather update
    setWeather({
      temperature: tempC,
      wind: data.wind_speed || 10,
      humidity: data.humidity || 70,
      condition: data.weather
    });

    // 🔹 NEW: update trend history (last 8 readings)
    const newEntry = {
      temp: tempC,
      time: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev.slice(-7), newEntry]);
  };

  return (
    <Layout>
      <h2>Live Weather Monitoring</h2>

      <div style={{marginBottom:"20px"}}>
        <input
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          style={{padding:"8px", marginRight:"10px"}}
        />

        <button onClick={fetchWeather}>
          Get Weather
        </button>
      </div>

      <div className="glass">
        {weather && (

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:"20px"
          }}>

            <div className="glass">
              <h4>🌡 Temperature</h4>
              <h2 style={{
                color:
                  weather.temperature > 35 ? "red" :
                  weather.temperature < 15 ? "cyan" :
                  "white"
              }}>
                {weather.temperature}°C
              </h2>
            </div>

            <div className="glass">
              <h4>💨 Wind Speed</h4>
              <h2 style={{
                color: weather.wind > 25 ? "orange" : "white"
              }}>
                {weather.wind} km/h
              </h2>
            </div>

            <div className="glass">
              <h4>💧 Humidity</h4>
              <h2 style={{
                color: weather.humidity > 80 ? "deepskyblue" : "white"
              }}>
                {weather.humidity}%
              </h2>
            </div>

            <div className="glass">
              <h4>☁ Condition</h4>
              <h2>{weather.condition}</h2>
            </div>

          </div>

        )}
      </div>


      {/* 🔹 NEW: Temperature Trend Chart */}
      {history.length > 1 && (

        <div className="glass" style={{
          marginTop:"25px",
          height:"300px",
          padding:"20px"
        }}>

          <Line
            data={{
              labels: history.map(h=>h.time),
              datasets:[{
                label:"Temperature Trend",
                data: history.map(h=>h.temp),
                borderColor:"cyan",
                backgroundColor:"rgba(0,255,255,0.2)",
                tension:0.3
              }]
            }}
            options={{
              maintainAspectRatio:false
            }}
          />

        </div>

      )}

    </Layout>
  );
}
