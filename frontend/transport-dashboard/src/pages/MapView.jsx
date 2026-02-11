import Layout from "../components/layout/Layout";
import RiskMap from "../components/map/RiskMap";

export default function MapView(){
  return (
    <Layout>
      <h2>Risk Prediction Map</h2>
      <RiskMap />
    </Layout>
  );
}
