import Hero from "../components/Hero.jsx";
import Ciclo from "../components/Ciclo.jsx";
import Plano from "../components/Plano.jsx";
import Faq from "../components/Faq.jsx";
import { VARIANTES, HERO_V3, CTA_ESPECIALISTA } from "../data/variantes.js";
import Casca from "./Casca.jsx";
import { montar } from "./montar.jsx";

/**
 * /3 — a mínima: hero, como funciona, plano e FAQ.
 * Hero com a copy curta ("Diminua sua folha…") e um botão só.
 */
function PaginaV3() {
  return (
    <Casca secoes={VARIANTES.v3}>
      <Hero titulo={HERO_V3.titulo} sub={HERO_V3.sub} ctaUnico={CTA_ESPECIALISTA} />
      <Ciclo />
      <Plano />
      <Faq />
    </Casca>
  );
}

montar(PaginaV3);
