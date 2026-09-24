import Titulo from "./Titulo.jsx";
import Circuito from "./Circuito.jsx";
import { Dispositivo } from "./Icones.jsx";
import { LogoMeta, LogoGoogle } from "./Mocks.jsx";
import { BASE } from "../data/conteudo.js";

/**
 * Bloco 02 — a base.
 * Na referencia e o "100% WordPress": dois ladrilhos de vidro no centro, com
 * linhas neon saindo para os dois lados e uma estatistica embaixo.
 */
export default function Base() {
  return (
    <section className="secao centro" id="base">
      <div className="wrap">
        <Titulo partes={BASE.titulo} nivel="h2" />
        <p className="sub">{BASE.sub}</p>

        <p className="selo" style={{ marginTop: 34 }}>
          {BASE.selo}
        </p>

        <div className="ladrilhos" data-revela>
          <div className="neon" aria-hidden="true">
            <Circuito lado="esquerda" />
            <Circuito lado="direita" />
          </div>

          <div className="ladrilho ladrilho-3d">
            <img loading="lazy" decoding="async" src="/mock-meta.webp" alt="Meta" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 18px 40px rgba(61,123,249,0.5))' }} />
          </div>
          <div className="ladrilho ladrilho-3d">
            <img loading="lazy" decoding="async" src="/mock-google.webp" alt="Google" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 18px 40px rgba(138,180,255,0.4))' }} />
          </div>
        </div>

        <div className="estatistica" data-revela>
          <span className="estatistica__caixa">
            <Dispositivo />
          </span>
          <div>
            <div className="estatistica__valor">{BASE.estatistica.valor}</div>
            <div className="estatistica__texto">{BASE.estatistica.texto}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
