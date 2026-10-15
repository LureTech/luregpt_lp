import Hero from "../components/Hero.jsx";
import Pilares from "../components/Pilares.jsx";
import { ParaQuem } from "../components/Seguranca.jsx";
import Plano from "../components/Plano.jsx";
import Faq from "../components/Faq.jsx";
import { VARIANTES } from "../data/variantes.js";
import Casca from "./Casca.jsx";
import { montar } from "./montar.jsx";

/**
 * /2 — o produto: hero, os seis pilares, para quem é, plano e FAQ.
 */
function PaginaV2() {
  return (
    <Casca secoes={VARIANTES.v2}>
      <Hero />
      <Pilares />
      <ParaQuem />
      <Plano />
      <Faq />
    </Casca>
  );
}

montar(PaginaV2);
