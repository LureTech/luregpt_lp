import { useEffect, useRef, useState } from "react";
import FormularioLead from "./FormularioLead.jsx";

/**
 * Popup do formulário.
 * Todo botão que aponta para #fechamento ("Quero o Lure GPT" no topo, no
 * hero, no plano e no rodapé) abre o formulário aqui — a página não tem mais
 * a seção de fechamento. O clique é pego na fase de captura para chegar antes
 * do handler de âncoras de animacoes.js, que rolaria a página.
 */
export default function ModalLead() {
  const [aberto, setAberto] = useState(false);
  const caixa = useRef(null);
  const voltarFoco = useRef(null);

  useEffect(() => {
    function aoClicar(e) {
      const a = e.target.closest?.('a[href="#fechamento"]');
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      voltarFoco.current = a;
      setAberto(true);
    }
    document.addEventListener("click", aoClicar, true);

    // link compartilhado com #fechamento (anúncio, WhatsApp) já abre o popup
    if (window.location.hash === "#fechamento") setAberto(true);

    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  useEffect(() => {
    if (!aberto) return;

    const html = document.documentElement;
    html.classList.add("modal-aberto");
    caixa.current?.querySelector("input")?.focus({ preventScroll: true });

    function aoTeclar(e) {
      if (e.key === "Escape") setAberto(false);
    }
    document.addEventListener("keydown", aoTeclar);

    return () => {
      html.classList.remove("modal-aberto");
      document.removeEventListener("keydown", aoTeclar);
      voltarFoco.current?.focus({ preventScroll: true });
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="modal-lead"
      data-lenis-prevent
      onMouseDown={(e) => {
        // clique no fundo escuro fecha; clique dentro do formulário não
        if (e.target === e.currentTarget) setAberto(false);
      }}
    >
      <div
        className="modal-lead__caixa"
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-lead-titulo"
      >
        <FormularioLead idTitulo="modal-lead-titulo" fechar={() => setAberto(false)} />
      </div>
    </div>
  );
}
