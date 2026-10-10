import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Obrigado from "./components/Obrigado.jsx";
import "./styles/global.css";
import "./styles/obrigado.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Obrigado />
  </StrictMode>
);
