import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import Header from "./shared/Header/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />

      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
