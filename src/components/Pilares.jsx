import Titulo from "./Titulo.jsx";
import { MockAudio, MockClone, MockAgenda, MockVideo, MockCrm, MockApp } from "./Mocks.jsx";
import { PILARES } from "../data/conteudo.js";

/**
 * Os seis pilares — briefing 03.
 * Na referência é a secao "Nao basta ser bonita": cartoes escalonados, cada um
 * com a tela do produto em cima e o brilho subindo do rodape.
 */
const TELAS = {
  campanha: MockAudio,
  landing: MockClone,
  instagram: MockAgenda,
  video: MockVideo,
  crm: MockCrm,
  app: MockApp,
};

export default function Pilares() {
  return (
    <section className="secao centro" id="pilares">
      <div className="wrap">
        <Titulo partes={PILARES.titulo} nivel="h2" />
        <p className="sub">{PILARES.sub}</p>

        <div className="escada">
          {PILARES.itens.map((p, i) => {
            const Tela = TELAS[p.id];
            return (
              <article
                className="cartao"
                id={p.id}
                key={p.id}
                data-revela
                style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              >
                <div className="cartao__palco">
                  {Tela && <Tela />}
                  <span className="brilho-baixo" />
                </div>

                <div className="cartao__corpo">
                  <p className="cartao__fala">“{p.fala}”</p>
                  <h3 className="cartao__titulo">{p.titulo}</h3>
                  <p className="cartao__texto">{p.texto}</p>
                  <p className="cartao__ficha">{p.ficha}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
