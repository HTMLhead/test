import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/foundation.css";
import "./styles/typography.css";
import "./styles/app.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
