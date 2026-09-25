import { useState } from "react";
import { Chevron, Seta } from "./Icones.jsx";
import { FAQ } from "../data/conteudo.js";

/**
 * Perguntas frequentes — duas colunas de acordeão, como na referência.
 * Fecha a página em fundo claro: depois do preço vêm as objeções, e o último
 * botão abre o popup do formulário.
 */
export default function Faq() {
  const [aberta, setAberta] = useState(0);

  return (
    <section className="secao centro secao--clara faq-final" id="faq">
      <div className="wrap">
        <p className="selo">faq</p>
        <h2 style={{ marginTop: 18 }}>Perguntas frequentes</h2>

        <div className="faq">
          {FAQ.map((item, i) => {
            const estaAberta = aberta === i;
            return (
              <div className="faq__item" data-aberto={estaAberta} key={item.p}>
                <h3 style={{ margin: 0, fontSize: "1rem" }}>
                  <button
                    type="button"
                    className="faq__botao"
                    aria-expanded={estaAberta}
                    aria-controls={`faq-${i}`}
                    onClick={() => setAberta(estaAberta ? -1 : i)}
                  >
                    {item.p}
                    <span className="faq__seta">
                      <Chevron />
                    </span>
                  </button>
                </h3>

                <div className="faq__corpo" id={`faq-${i}`} role="region">
                  <div>
                    <p>{item.r}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq__cta">
          <div>
            <strong>Ficou alguma dúvida?</strong>
            <p>Deixe seu WhatsApp e o comercial responde em menos de 5 minutos.</p>
          </div>
          <a className="btn-cheio" href="#fechamento">
            Quero o Lure GPT
            <Seta />
          </a>
        </div>
      </div>
    </section>
  );
}
