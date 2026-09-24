import { useEffect, useRef } from "react";

/**
 * Título com palavras em destaque.
 * Na referência o realce é rosa; aqui é azul. O texto vem como uma lista de
 * pedaços para o realce cair na palavra certa, sem HTML solto no conteúdo.
 *
 * Com `digita`, o título é escrito letra a letra, com cursor piscando, em laço.
 * É opt-in de propósito: hoje nenhuma seção usa. Espalhar isso por
 * todos os títulos faria a página inteira ficar piscando.
 *
 * Detalhe que importa: as letras já nascem todas no lugar e só ficam
 * `visibility: hidden`. Assim o texto não reflui enquanto é escrito — se
 * fossem sendo inseridas, as palavras pulariam de linha a cada letra.
 */

const VELOCIDADE = 30; // ms por letra
const PAUSA_CHEIO = 2200; // ms parado depois de escrever tudo
const PAUSA_VAZIO = 480; // ms parado antes de recomeçar

export default function Titulo({ partes, nivel = "h2", className = "", digita = false }) {
  const Tag = nivel;
  const ref = useRef(null);

  useEffect(() => {
    if (!digita) return;
    const el = ref.current;
    if (!el) return;

    const letras = Array.from(el.querySelectorAll(".letra"));
    if (!letras.length) return;

    const mostrarTudo = () => {
      for (const l of letras) {
        l.classList.add("vista");
        l.classList.remove("cursor");
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mostrarTudo();
      return;
    }

    let rodando = false;
    let temporizadores = [];

    const limpar = () => {
      temporizadores.forEach(clearTimeout);
      temporizadores = [];
    };
    const esperar = (ms) =>
      new Promise((r) => {
        temporizadores.push(setTimeout(r, ms));
      });

    async function ciclo() {
      while (rodando) {
        for (const l of letras) {
          l.classList.remove("vista", "cursor");
        }
        await esperar(PAUSA_VAZIO);

        for (let i = 0; i < letras.length; i++) {
          if (!rodando) return;
          letras[i - 1]?.classList.remove("cursor");
          letras[i].classList.add("vista", "cursor");
          await esperar(VELOCIDADE);
        }

        if (!rodando) return;
        await esperar(PAUSA_CHEIO);
      }
    }

    // só escreve quando está na tela; fora dela fica legível e parado
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!rodando) {
            rodando = true;
            ciclo();
          }
        } else if (rodando) {
          rodando = false;
          limpar();
          mostrarTudo();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      rodando = false;
      limpar();
      io.disconnect();
    };
  }, [digita]);

  const conteudo = partes.map((p, i) =>
    p.realce ? (
      <span className="realce" key={i}>
        {p.t}
      </span>
    ) : (
      <span key={i}>{p.t}</span>
    )
  );

  if (!digita) {
    return <Tag className={className}>{conteudo}</Tag>;
  }

  // aria-label no titulo em vez de uma copia escondida do texto: assim o
  // leitor de tela recebe a frase inteira e o conteudo nao aparece duplicado.
  return (
    <Tag className={`digita ${className}`.trim()} ref={ref} aria-label={partes.map((p) => p.t).join("")}>
      <span aria-hidden="true">
        {partes.map((p, i) => (
          <span className={p.realce ? "realce" : undefined} key={i}>
            {Array.from(p.t).map((c, j) => (
              <span className="letra" key={j}>
                {c}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
