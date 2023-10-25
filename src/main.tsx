import React from "react";
import ReactDOM from "react-dom/client";

import Providers from "./components/Providers";
import App from "./components/App";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
