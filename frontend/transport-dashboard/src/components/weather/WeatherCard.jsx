export default function WeatherCard({title, value}) {
  return (
    <div className="glass" style={{
      flex:1,
      textAlign:"center"
    }}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
