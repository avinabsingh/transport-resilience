import { Line } from "react-chartjs-2";
import "./ChartSetup";

export default function WeatherTrend(){

  const data = {
    labels:["Mon","Tue","Wed","Thu","Fri","Sat"],
    datasets:[{
      label:"Temperature Trend",
      data:[29,31,30,32,33,31],
      borderColor:"cyan"
    }]
  };

  return (
    <div className="glass">
      <Line data={data}/>
    </div>
  );
}
