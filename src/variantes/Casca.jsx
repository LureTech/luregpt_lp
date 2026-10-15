import { useEffect } from "react";
import Topo from "../components/Topo.jsx";
import Rodape from "../components/Rodape.jsx";
import ModalLead from "../components/ModalLead.jsx";
import { iniciarAnimacoes, ligarTilt, ligarFoco } from "../lib/animacoes.js";

/**
 * A mesma casca da LP principal (App.jsx): barra de progresso, foco de luz,
 * topo, rodapé, popup do formulário e as mesmas animações.
 * As variações só escolhem quais seções entram no meio — o design não muda.
 *
 * `secoes` são os ids das seções presentes, para o menu do topo e o rodapé
 * não apontarem para o que não existe nesta versão.
 */
export default function Casca({ secoes, children }) {
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

      <Topo secoes={secoes} />

      <main>{children}</main>

      <Rodape secoes={secoes} />

      <ModalLead />
    </>
  );
}
