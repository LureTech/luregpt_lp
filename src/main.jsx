import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/secoes.css";
import "./styles/mocks.css";
import "./styles/polimento.css";
import { guardarOrigem } from "./lib/tracking.js";

// Guarda a UTM da origem antes de qualquer coisa — briefing 10:
// "UTM preservada da origem até o destino do lead".
guardarOrigem();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
