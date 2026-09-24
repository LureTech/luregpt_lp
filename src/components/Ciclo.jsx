import Titulo from "./Titulo.jsx";
import { MockProduz, MockSobe, MockAtende } from "./Mocks.jsx";
import { CICLO } from "../data/conteudo.js";

/**
 * Bloco 03 — o ciclo completo (briefing 04).
 * Na referencia e a secao "Uma estrutura que realmente converte": faixa com
 * avisos e tres colunas com brilho subindo do rodape de cada uma.
 */
const TELAS = [MockProduz, MockSobe, MockAtende];

export default function Ciclo() {
  return (
    <section className="secao centro secao--clara" id="ciclo">
      <div className="wrap">
        <Titulo partes={CICLO.titulo} nivel="h2" />
        <p className="sub">{CICLO.sub}</p>

        <div className="faixa" data-revela>
          <p className="faixa__frase">{CICLO.faixa.frase}</p>

          {CICLO.faixa.avisos.map((a) => (
            <div className="aviso" key={a.texto}>
              <span className="aviso__ponto">{a.icone}</span>
              <span className="aviso__texto">
                {a.texto} <b>{a.forte}</b>
              </span>
              <span className="aviso__hora">{a.hora}</span>
            </div>
          ))}
        </div>

        <div className="trio">
          {CICLO.colunas.map((c, i) => {
            const Tela = TELAS[i];
            return (
              <article className="trio-item" key={c.titulo} data-revela>
                <div className="trio-item__palco">
                  <Tela />
                  <span className="brilho-baixo" />
                </div>
                <h3 className="trio-item__titulo">{c.titulo}</h3>
                <p className="trio-item__texto">{c.texto}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
