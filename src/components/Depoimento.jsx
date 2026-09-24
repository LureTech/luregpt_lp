import Titulo from "./Titulo.jsx";
import { Play } from "./Icones.jsx";
import { DEPOIMENTO } from "../data/conteudo.js";

/**
 * Prova em vídeo — briefing 06.
 * Na referência é o card grande com a barra de áudio no topo e o botão do
 * YouTube embaixo.
 */
export default function Depoimento() {
  // barras da onda; as acesas marcam o trecho já tocado
  const barras = Array.from({ length: 42 }, (_, i) => ({
    altura: 6 + Math.abs(Math.sin(i * 0.9)) * 16,
    aceso: i < 18,
  }));

  return (
    <section className="secao centro" id="depoimento">
      <div className="wrap">
        <Titulo partes={DEPOIMENTO.titulo} nivel="h2" />

        <div className="depoimento">
          <div className="depoimento__miolo">
            <div className="depoimento__cabeca">
              <span className="depoimento__avatar">{DEPOIMENTO.cabeca.inicial}</span>
              <div>
                <div className="depoimento__titulo">{DEPOIMENTO.cabeca.titulo}</div>
                <div className="depoimento__autor">{DEPOIMENTO.cabeca.autor}</div>
              </div>

              <div className="depoimento__player">
                <Play size={13} />
                <span className="onda">
                  {barras.map((b, i) => (
                    <i
                      key={i}
                      className={b.aceso ? "aceso" : ""}
                      style={{ height: b.altura, animationDelay: `${i * 0.03}s` }}
                    />
                  ))}
                </span>
                <span className="depoimento__marca-tempo">{DEPOIMENTO.tempo}</span>
              </div>
            </div>

            {/* Fundo: o frame do notebook que veio do HTML de referencia.
                PENDENTE: trocar pelo depoimento gravado (briefing 06). */}
            <img className="depoimento__fundo" loading="lazy" decoding="async" src="/notebook-poster.webp" alt="" />

            <button type="button" className="depoimento__play" aria-label="Assistir depoimento">
              <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M5 3.5v9l8-4.5-8-4.5z" />
              </svg>
            </button>

            <p className="depoimento__nota">{DEPOIMENTO.placeholder}</p>

            <span className="brilho-baixo" />

            <div className="depoimento__rodape">
              <span />
              <a className="btn-cheio" href="#" style={{ padding: "0.7rem 1.5rem" }}>
                {DEPOIMENTO.botao}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
