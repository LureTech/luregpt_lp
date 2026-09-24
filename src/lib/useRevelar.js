import { useEffect } from "react";

/**
 * Entrada por rolagem — a referência anima cada bloco ao aparecer.
 * Marca [data-revela] com data-visto quando entra na tela. Uma vez só:
 * elemento que reanima a cada rolagem cansa.
 *
 * Cuidado importante: numa rolagem rápida (barra arrastada, Fim, âncora) o
 * elemento entra e sai no mesmo quadro e o observer só reporta o estado final,
 * "fora da tela". Sem tratar isso, a seção fica invisível para sempre — a
 * pessoa vê um buraco branco no meio da página. Por isso também revelamos
 * quem já passou por cima do topo, e varremos tudo que ficou para trás.
 *
 * Quem pediu menos movimento (prefers-reduced-motion) recebe tudo já visível.
 */
export function useRevelar() {
  useEffect(() => {
    const alvos = Array.from(document.querySelectorAll("[data-revela]"));
    if (!alvos.length) return;

    const mostrar = (el) => el.setAttribute("data-visto", "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      alvos.forEach(mostrar);
      return;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          // já apareceu, ou passou tão rápido que só sobrou o rastro por cima
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            mostrar(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    alvos.forEach((el) => io.observe(el));

    // rede de segurança: qualquer bloco que já esteja acima da dobra aparece,
    // mesmo que o observer não tenha chegado a reportar.
    let agendado = 0;
    function varrer() {
      if (agendado) return;
      agendado = requestAnimationFrame(() => {
        agendado = 0;
        for (const el of alvos) {
          if (el.dataset.visto) continue;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
            mostrar(el);
            io.unobserve(el);
          }
        }
      });
    }

    window.addEventListener("scroll", varrer, { passive: true });
    window.addEventListener("resize", varrer, { passive: true });
    varrer();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", varrer);
      window.removeEventListener("resize", varrer);
      if (agendado) cancelAnimationFrame(agendado);
    };
  }, []);
}
