import Titulo from "./Titulo.jsx";
import CampoDePontos from "./CampoDePontos.jsx";
import { Seta, Microfone } from "./Icones.jsx";
import { HERO } from "../data/conteudo.js";

/**
 * Bloco 01 — o gancho.
 * Réplica do hero da referência: arco de luz no topo, grade em perspectiva,
 * pontinhos, título centralizado com palavras em destaque, CTA duplo e o
 * notebook girando embaixo (o vídeo veio do próprio HTML de referência).
 *
 * Única H1 da página e única seção com vídeo em reprodução automática.
 */
export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="arco" />
      <CampoDePontos className="hero__canvas" />

      <div className="wrap hero__conteudo hero__conteudo--dividido">
        <div className="hero__texto-col">
          <p className="selo">{HERO.selo}</p>

          <Titulo partes={HERO.titulo} nivel="h1" />

          <p className="sub">{HERO.sub}</p>

          <div className="hero__acoes">
            <a className="shiny-cta" href="#fechamento">
              {HERO.cta}
              <Seta />
            </a>
            <a className="btn-secundario" href="#fechamento">
              {HERO.ctaRotulo}
            </a>
          </div>

          <p className="hero__reforco">{HERO.reforco}</p>

          <span className="parceiro-meta">
            <img src="/mock-meta.webp" alt="" width="22" height="22" />
            {HERO.parceiro}
          </span>
        </div>

        <div className="hero__video-col">
          <div className="palco mockups-composition">
            {/* uma tela só: o Lure GPT no computador */}
            <div className="mockup-desktop vidro">
              <div className="browser-bar">
                <i /> <i /> <i />
              </div>
              <img src="/hero-desktop.webp" alt="Tela inicial do Lure GPT no computador" />
            </div>

            {/* Floating Card 1 */}
            <div className="palco__cartao vidro flutuante-1">
              <span className="palco__icone">
                <Microfone />
              </span>
              <div className="palco__numero">{HERO.cartao.numero}</div>
              <div className="palco__rotulo">{HERO.cartao.rotulo}</div>
            </div>

            {/* Floating Card 2 */}
            <div className="palco__cartao vidro flutuante-2">
              <span className="palco__icone" style={{ background: 'linear-gradient(160deg, #10b981, #059669)', color: '#fff' }}>
                ✓
              </span>
              <div className="palco__numero">+34%</div>
              <div className="palco__rotulo">conversão de leads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
