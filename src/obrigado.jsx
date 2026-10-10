import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Obrigado from "./components/Obrigado.jsx";
import "./styles/global.css";
import "./styles/obrigado.css";
import { marcarLeadObrigado } from "./lib/tracking.js";

// fora do React de propósito: o StrictMode roda efeitos duas vezes no dev
marcarLeadObrigado();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Obrigado />
  </StrictMode>
);
