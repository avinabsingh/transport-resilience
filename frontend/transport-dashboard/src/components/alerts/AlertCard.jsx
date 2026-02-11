export default function AlertCard({type, message}){

  const colorMap = {
    info:"#3498db",
    warning:"#f1c40f",
    danger:"#e74c3c"
  };

  return (
    <div className="glass" style={{
      borderLeft:`6px solid ${colorMap[type]}`,
      marginBottom:"15px"
    }}>
      <h3>{type.toUpperCase()}</h3>
      <p>{message}</p>
    </div>
  );
}
