import Layout from "../components/layout/Layout";
import { useState } from "react";
import { getPrediction } from "../services/api";
import { useContext } from "react";
import { PredictionContext } from "../services/PredictionContext";
export default function Overview(){

const {setPrediction} = useContext(PredictionContext);
const [city,setCity] = useState("Chennai");
const [result,setResult] = useState(null);

const fetchPrediction = async () => {
  const data = await getPrediction(city);

  console.log("API RESPONSE:", data); // debug

  // Ensure full object saved
  setResult(data);
  setPrediction({
    city: data.city,
    weather: data.weather,
    predicted_severity: data.predicted_severity,
    lat: data.lat,
    lon: data.lon
  });
};


  return (
    <Layout>
      <h2>Accident Risk Prediction</h2>

      <input
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={{padding:"8px", marginRight:"10px"}}
      />

      <button onClick={fetchPrediction}>
        Predict
      </button>

      {result && (
        <div className="glass" style={{marginTop:"20px"}}>

            <h3>City: {result.city}</h3>
            <p>Weather: {result.weather}</p>

            <p>
            Predicted Severity:
            <span style={{
                color:
                result.predicted_severity === 0 ? "green" :
                result.predicted_severity === 1 ? "yellow" :
                "red",
                fontWeight:"bold",
                marginLeft:"10px"
            }}>
                {result.predicted_severity}
            </span>
            </p>

        </div>
        )}

    </Layout>
  );
}
