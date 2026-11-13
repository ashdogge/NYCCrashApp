import { Routes, Route, Link } from "react-router";

import LandingPage from "./pages/LandingPage";
import Map from "./components/Map";
export default function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  );
}
