import Hero from "../components/Hero.jsx";
import Ciclo from "../components/Ciclo.jsx";
import Plano from "../components/Plano.jsx";
import Faq from "../components/Faq.jsx";
import { VARIANTES } from "../data/variantes.js";
import Casca from "./Casca.jsx";
import { montar } from "./montar.jsx";

/**
 * /3 — a mínima: hero, como funciona, plano e FAQ.
 */
function PaginaV3() {
  return (
    <Casca secoes={VARIANTES.v3}>
      <Hero />
      <Ciclo />
      <Plano />
      <Faq />
    </Casca>
  );
}

montar(PaginaV3);
