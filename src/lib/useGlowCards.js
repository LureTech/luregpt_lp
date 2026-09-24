import { useEffect, useRef } from "react";

/**
 * Glow que segue o mouse — portado do efeito .card da referência.
 * Escreve --mouse-x / --mouse-y em cada card, relativo ao próprio card.
 * Devolve a ref para pendurar no container .cards.
 */
export function useGlowCards() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Touch não tem cursor: o efeito não roda e não custa nada.
    const finoOuTouch = window.matchMedia("(hover: none)").matches;
    if (finoOuTouch) return;

    let frame = 0;

    function aoMover(e) {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        for (const card of container.querySelectorAll(".card")) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
        }
      });
    }

    container.addEventListener("pointermove", aoMover);
    return () => {
      container.removeEventListener("pointermove", aoMover);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
