import Hero from "../components/Hero.jsx";
import Base from "../components/Base.jsx";
import Ciclo from "../components/Ciclo.jsx";
import Pilares from "../components/Pilares.jsx";
import { ParaQuem } from "../components/Seguranca.jsx";
import Plano from "../components/Plano.jsx";
import { VARIANTES, CTA_ESPECIALISTA } from "../data/variantes.js";
import Casca from "./Casca.jsx";
import { montar } from "./montar.jsx";

/**
 * /4 — a LP inteira sem segurança, "e ainda vem junto" e FAQ.
 * Fica: hero, Meta/Google, como funciona, os seis pilares, para quem é e plano.
 * Hero com a copy da LP principal e um botão só.
 */
function PaginaV4() {
  return (
    <Casca secoes={VARIANTES.v4}>
      <Hero ctaUnico={CTA_ESPECIALISTA} />
      <Base />
      <Ciclo />
      <Pilares />
      <ParaQuem />
      <Plano />
    </Casca>
  );
}

montar(PaginaV4);
