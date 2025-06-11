import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Search from "./search.jsx";
import Ingest from "./ingest.jsx";
import FlightPlan from "./flightPlan.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <FlightPlan />
      <Ingest />
      <Search />
  </StrictMode>,
)
