import { Routes, Route, Link } from "react-router";

import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}
