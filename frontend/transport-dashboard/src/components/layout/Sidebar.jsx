import { Link } from "react-router-dom";

export default function Sidebar(){
  return (
    <div className="sidebar">
      <h2>Transport AI</h2>

      <Link to="/">Overview</Link>
      <Link to="/weather">Weather</Link>
      <Link to="/map">Risk Map</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/alerts">Alerts</Link>
    </div>
  );
}
