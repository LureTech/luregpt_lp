import Hero from "../components/Hero.jsx";
import Ciclo from "../components/Ciclo.jsx";
import { Seguranca, ParaQuem } from "../components/Seguranca.jsx";
import Plano from "../components/Plano.jsx";
import Faq from "../components/Faq.jsx";
import { VARIANTES } from "../data/variantes.js";
import Casca from "./Casca.jsx";
import { montar } from "./montar.jsx";

/**
 * /1 — a LP sem Meta/Google, os seis cartões e os extras.
 * Fica: hero, como funciona, segurança, para quem é, plano e FAQ.
 */
function PaginaV1() {
  return (
    <Casca secoes={VARIANTES.v1}>
      <Hero />
      <Ciclo />
      <Seguranca />
      <ParaQuem />
      <Plano />
      <Faq />
    </Casca>
  );
}

montar(PaginaV1);
