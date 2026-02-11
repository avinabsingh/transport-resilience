import { BrowserRouter, Routes, Route } from "react-router-dom";

import Overview from "./pages/Overview";
import Weather from "./pages/Weather";
import MapView from "./pages/MapView";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
