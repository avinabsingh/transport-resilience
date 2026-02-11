import Layout from "../components/layout/Layout";
import { useContext } from "react";
import { PredictionContext } from "../services/PredictionContext";

import { Bar } from "react-chartjs-2";
import "../components/charts/ChartSetup";

export default function Analytics(){

  const { prediction } = useContext(PredictionContext);

  // Default counts
  let low = 0;
  let medium = 0;
  let high = 0;

  if(prediction){
    if(prediction.predicted_severity === 0) low++;
    if(prediction.predicted_severity === 1) medium++;
    if(prediction.predicted_severity === 2) high++;
  }

  const data = {
    labels:["Low","Medium","High"],
    datasets:[{
      label:"Current Risk Distribution",
      data:[low,medium,high],
      backgroundColor:["green","yellow","red"]
    }]
  };

  return (
    <Layout>
      <h2>Predictive Analytics</h2>

      <div
            className="glass"
            style={{
                marginTop:"20px",
                width:"600px",
                height:"350px",
                padding:"20px"
            }}
            >
            <Bar
                data={data}
                options={{
                maintainAspectRatio:false,
                responsive:true
                }}
            />
        </div>

    </Layout>
  );
}
