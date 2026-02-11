import Layout from "../components/layout/Layout";
import AlertCard from "../components/alerts/AlertCard";
import { useContext } from "react";
import { PredictionContext } from "../services/PredictionContext";

export default function Alerts(){

  const { prediction } = useContext(PredictionContext);

  let alerts = [];

  if(prediction){

    if(prediction.predicted_severity === 2){
      alerts.push({
        type:"danger",
        message:`High accident severity risk detected in ${prediction.city}`
      });
    }

    if(prediction.weather.toLowerCase().includes("mist") ||
       prediction.weather.toLowerCase().includes("fog")){
      alerts.push({
        type:"warning",
        message:"Low visibility conditions detected"
      });
    }

    alerts.push({
      type:"info",
      message:`Weather condition: ${prediction.weather}`
    });

  } else {
    alerts.push({
      type:"info",
      message:"Run prediction to generate alerts"
    });
  }

  return (
    <Layout>
      <h2>System Alerts</h2>

      <div style={{marginTop:"20px"}}>
        {alerts.map((a,i)=>(
          <AlertCard
            key={i}
            type={a.type}
            message={a.message}
          />
        ))}
      </div>

    </Layout>
  );
}
