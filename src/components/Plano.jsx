import Titulo from "./Titulo.jsx";
import { CheckDuplo, Chevron } from "./Icones.jsx";
import { PLANO } from "../data/conteudo.js";

/**
 * Bloco 11 — investimento.
 * Réplica da seção de preço da referência: marca à esquerda, o cartão com
 * entalhe no topo no meio, e a lista de vantagens à direita.
 */
export default function Plano() {
  return (
    <section className="secao centro" id="plano">
      <div className="wrap">
        <Titulo partes={PLANO.titulo} nivel="h2" />

        <div className="preco-grade">
          <div>
            <div className="preco-marca">
              {PLANO.marca.nome}
              <b>{PLANO.marca.destaque}</b>
            </div>
            <p className="preco-desc">{PLANO.descricao}</p>
          </div>

          <article className="plano">
            <span className="plano__entalhe" />
            <span className="plano__seta">
              <Chevron size={22} />
            </span>

            <h3 className="plano__nome">
              {PLANO.nome}
              <b>{PLANO.nomeDestaque}</b>
            </h3>

            <span className="plano__etiqueta">{PLANO.etiqueta}</span>

            <p className="plano__de">{PLANO.de}</p>
            <p className="plano__valor">{PLANO.valor}</p>
            <p className="plano__nota">{PLANO.nota}</p>

            <div className="plano__cta">
              <a className="btn-cheio" href="#fechamento">
                {PLANO.cta}
              </a>
            </div>
          </article>

          <ul className="vantagens">
            {PLANO.vantagens.map((v) => (
              <li key={v.forte}>
                <CheckDuplo />
                <span>
                  <b>{v.forte}</b> {v.texto}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
