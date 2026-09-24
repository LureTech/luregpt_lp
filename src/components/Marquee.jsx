import { MARQUEE } from "../data/conteudo.js";

/** Faixa que corre. A lista sai duplicada para o laco nao dar salto. */
export default function Marquee() {
  const fita = [...MARQUEE, ...MARQUEE];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__trilho">
        {fita.map((frase, i) => (
          <span className="marquee__item" key={`${frase}-${i}`}>
            {frase}
            <i>·</i>
          </span>
        ))}
      </div>
    </div>
  );
}
