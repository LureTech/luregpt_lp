import Topo from "./components/Topo.jsx";
import Hero from "./components/Hero.jsx";

import Base from "./components/Base.jsx";
import Ciclo from "./components/Ciclo.jsx";

import Pilares from "./components/Pilares.jsx";
import { Seguranca, Apoio, ParaQuem } from "./components/Seguranca.jsx";
import Plano from "./components/Plano.jsx";

import Fechamento from "./components/Fechamento.jsx";
import Rodape from "./components/Rodape.jsx";
import { useEffect } from "react";
import { iniciarAnimacoes, ligarTilt, ligarFoco } from "./lib/animacoes.js";

/**
 * Landing page do Lure GPT.
 * A estrutura visual replica a ElevateLP (o HTML de referencia), secao por
 * secao, com o rosa trocado por azul. O conteudo vem do briefing v2.
 */
export default function App() {
  useEffect(() => {
    let pararAnimacoes = () => {};
    let pararTilt = () => {};
    let pararFoco = () => {};
    let vivo = true;

    // um quadro de folga para o layout assentar antes de medir os gatilhos
    const id = requestAnimationFrame(() => {
      if (!vivo) return; // o StrictMode monta duas vezes no dev
      pararAnimacoes = iniciarAnimacoes();
      pararTilt = ligarTilt(".cartao, .ladrilho, .plano", 7);
      pararFoco = ligarFoco();
    });

    return () => {
      vivo = false;
      cancelAnimationFrame(id);
      pararFoco();
      pararTilt();
      pararAnimacoes();
    };
  }, []);

  return (
    <>
      <div className="progresso" aria-hidden="true" />
      <div className="foco" aria-hidden="true" />

      <Topo />

      <main>
        <Hero />

        <Base />
        <Ciclo />

        <Pilares />
        <Seguranca />
        <Apoio />
        <ParaQuem />
        <Plano />

        <Fechamento />
      </main>

      <Rodape />
    </>
  );
}
