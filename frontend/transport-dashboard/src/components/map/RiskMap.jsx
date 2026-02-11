import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import { useContext, useEffect } from "react";
import { PredictionContext } from "../../services/PredictionContext";

function Recenter({lat,lon}) {
  const map = useMap();

  useEffect(()=>{
    if(lat && lon){
      map.setView([lat,lon],7);
    }
  },[lat,lon]);

  return null;
}

export default function RiskMap(){

  const { prediction } = useContext(PredictionContext);

  const center = [20.5937,78.9629];

  return (
    <div className="glass" style={{height:"500px"}}>

      <MapContainer
        center={center}
        zoom={5}
        style={{height:"100%", width:"100%"}}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {prediction && (
          <>
            <Recenter lat={prediction.lat} lon={prediction.lon}/>

            <CircleMarker
              center={[prediction.lat,prediction.lon]}
              radius={25}
              pathOptions={{
                color:
                  prediction.predicted_severity === 0
                    ? "green"
                    : prediction.predicted_severity === 1
                    ? "yellow"
                    : "red"
              }}
            >
              <Popup>
                {prediction.city} — Risk Level {prediction.predicted_severity}
              </Popup>
            </CircleMarker>
          </>
        )}

      </MapContainer>

    </div>
  );
}
