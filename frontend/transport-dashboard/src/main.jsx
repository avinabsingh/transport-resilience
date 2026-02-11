import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/theme.css'
import "leaflet/dist/leaflet.css";

import { PredictionProvider } from "./services/PredictionContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PredictionProvider>
      <App />
    </PredictionProvider>
  </React.StrictMode>,
)
