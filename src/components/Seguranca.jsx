import Titulo from "./Titulo.jsx";
import { CheckDuplo, Cruz, Cadeado } from "./Icones.jsx";
import IconeLinha from "./IconesLinha.jsx";
import { SEGURANCA, APOIO, PARA_QUEM } from "../data/conteudo.js";

/**
 * Três blocos seguidos que, se usassem o mesmo cartão, virariam uma parede
 * cinza. Cada um tem um desenho próprio: travas numeradas, lista com filete,
 * e duas colunas grandes.
 */

/** Bloco 10 — a objeção silenciosa.
 * À esquerda, um painel do produto mostrando as travas funcionando (campanha
 * pausada, pedido de confirmação de verba, trilha de auditoria). À direita,
 * as seis travas em cartões com ícone. */
export function Seguranca() {
  return (
    <section className="secao centro seguranca secao--clara" id="seguranca">
      <div className="wrap">
        <span className="seguranca__selo">
          <Cadeado size={20} />
        </span>

        <Titulo partes={SEGURANCA.titulo} nivel="h2" />
        <p className="sub">{SEGURANCA.sub}</p>

        <div className="cofre">
          <PainelSeguranca />

          <div className="travas">
            {SEGURANCA.travas.map((t, i) => (
              <article className="trava" key={t.titulo}>
                <div className="trava__topo">
                  <span className="trava__icone">
                    <IconeLinha nome={t.icone} size={20} />
                  </span>
                  <span className="trava__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="trava__titulo">{t.titulo}</h3>
                <p className="trava__texto">{t.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tela ilustrativa: é o que as travas significam na prática. */
function PainelSeguranca() {
  return (
    <div className="cofre__painel" aria-hidden="true">
      <div className="cofre__barra">
        <i /> <i /> <i />
        <span>Lure GPT · Campanhas</span>
      </div>

      <div className="cofre__campanha">
        <div>
          <p className="cofre__rotulo">Campanha</p>
          <p className="cofre__nome">Black Friday · Loja Aurora</p>
        </div>
        <span className="cofre__status">
          <b /> Pausada
        </span>
      </div>

      <div className="cofre__metricas">
        <div>
          <p className="cofre__rotulo">Gasto</p>
          <p className="cofre__valor">R$ 0,00</p>
        </div>
        <div>
          <p className="cofre__rotulo">Criativos</p>
          <p className="cofre__valor">3 prontos</p>
        </div>
        <div>
          <p className="cofre__rotulo">Público</p>
          <p className="cofre__valor">SP · 25–44</p>
        </div>
      </div>

      <div className="cofre__pedido">
        <span className="cofre__pedido-icone">
          <IconeLinha nome="escudo" size={18} />
        </span>
        <div className="cofre__pedido-texto">
          <p>
            A IA quer ativar com <b>R$ 150/dia</b>.
          </p>
          <span>Precisa da sua confirmação.</span>
        </div>
        <div className="cofre__botoes">
          <span className="cofre__botao">Recusar</span>
          <span className="cofre__botao cofre__botao--sim">Confirmar</span>
        </div>
      </div>

      <ul className="cofre__log">
        <li>
          <time>14:02</time> Ana pediu a campanha por áudio
        </li>
        <li>
          <time>14:02</time> IA montou tudo e deixou <b>pausada</b>
        </li>
        <li>
          <time>14:05</time> Ana confirmou o orçamento
        </li>
      </ul>
    </div>
  );
}

/** Bloco 09 — e ainda. Sete cartões do mesmo formato: uma mini-ilustração
 * animada em cima (o recurso funcionando) e ícone, título e texto embaixo. */
export function Apoio() {
  return (
    <section className="secao centro" id="apoio">
      <div className="wrap">
        <Titulo partes={APOIO.titulo} nivel="h2" />
        <p className="sub">{APOIO.sub}</p>

        <div className="bento">
          {APOIO.itens.map((i) => (
            <article className="bento__item" key={i.titulo}>
              <div className="bento__visual" aria-hidden="true">
                <VisualApoio tipo={i.visual} />
              </div>
              <div className="bento__corpo">
                <span className="bento__icone">
                  <IconeLinha nome={i.icone} size={18} />
                </span>
                <h3 className="bento__titulo">{i.titulo}</h3>
                <p className="bento__texto">{i.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Cada ilustração tem animação em laço, feita só com CSS. */
function VisualApoio({ tipo }) {
  switch (tipo) {
    case "whats":
      return (
        <div className="vis vis-whats">
          <span className="vis-whats__digitando">
            <i /> <i /> <i />
          </span>
          <div className="vis-whats__bolha">
            <b>Relatório · Loja Aurora</b>
            <span>ROAS 4,8 (+12%) · 212 leads</span>
            <time>08:00 ✓✓</time>
          </div>
        </div>
      );
    case "audio":
      return (
        <div className="vis vis-audio">
          <span className="vis-audio__play" />
          <div className="vis-audio__onda">
            {Array.from({ length: 18 }, (_, k) => (
              <i key={k} style={{ "--h": `${28 + ((k * 37) % 66)}%`, "--d": `${(k % 6) * 0.11}s` }} />
            ))}
          </div>
        </div>
      );
    case "otimiza":
      return (
        <div className="vis vis-otimiza">
          {["Lance ajustado", "Público refinado", "Criativo pausado"].map((t, k) => (
            <div className="vis-otimiza__linha" key={t} style={{ "--d": `${k * 0.6}s` }}>
              <span className="vis-otimiza__check">✓</span>
              {t}
            </div>
          ))}
        </div>
      );
    case "saude":
      return (
        <div className="vis vis-saude">
          <svg viewBox="0 0 120 70" className="vis-saude__arco">
            <path d="M10 64 A50 50 0 0 1 110 64" className="trilho" />
            <path d="M10 64 A50 50 0 0 1 110 64" className="valor" pathLength="100" />
          </svg>
          <b>87</b>
          <em>upsell</em>
        </div>
      );
    case "biblio":
      return (
        <div className="vis vis-biblio">
          {Array.from({ length: 6 }, (_, k) => (
            <i key={k} style={{ "--d": `${k * 0.25}s` }} />
          ))}
        </div>
      );
    case "saldo":
      return (
        <div className="vis vis-saldo">
          <div className="vis-saldo__linha">
            <span>Loja Aurora</span>
            <b>R$ 1.240</b>
          </div>
          <div className="vis-saldo__linha alerta">
            <span>Clínica Vita</span>
            <b>R$ 86</b>
          </div>
          <div className="vis-saldo__tanque">
            <i />
          </div>
        </div>
      );
    default:
      return (
        <div className="vis vis-presenca">
          {[
            ["Você", 88, true],
            ["Conc. A", 62],
            ["Conc. B", 44],
          ].map(([nome, v, seu], k) => (
            <div className={`vis-presenca__linha${seu ? " seu" : ""}`} key={nome}>
              <span>{nome}</span>
              <div>
                <i style={{ "--v": `${v}%`, "--d": `${k * 0.2}s` }} />
              </div>
            </div>
          ))}
        </div>
      );
  }
}

/** Bloco 11 — para quem é. */
export function ParaQuem() {
  return (
    <section className="secao centro secao--clara" id="para-quem">
      <div className="wrap">
        <Titulo partes={PARA_QUEM.titulo} nivel="h2" />
        <p className="sub">{PARA_QUEM.sub}</p>

        <div className="honestas">
          <Coluna dados={PARA_QUEM.sim} sim />
          <Coluna dados={PARA_QUEM.nao} />
        </div>
      </div>
    </section>
  );
}

function Coluna({ dados, sim = false }) {
  return (
    <div className={`honesta${sim ? " honesta--sim" : ""}`} data-revela>
      {sim && <span className="brilho-baixo" />}
      <h3 className="honesta__titulo">{dados.titulo}</h3>

      <ul>
        {dados.itens.map((t) => (
          <li key={t}>
            <span className="honesta__marca">
              {sim ? <CheckDuplo size={16} /> : <Cruz size={14} />}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
