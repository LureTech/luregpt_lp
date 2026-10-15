import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/global.css";
import "../styles/secoes.css";
import "../styles/mocks.css";
import "../styles/polimento.css";
import { guardarOrigem } from "../lib/tracking.js";

/**
 * Entrada das variações curtas — o mesmo que src/main.jsx faz para a LP:
 * os mesmos estilos, e a UTM da origem guardada antes de qualquer coisa.
 */
export function montar(Pagina) {
  guardarOrigem();

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Pagina />
    </StrictMode>
  );
}
