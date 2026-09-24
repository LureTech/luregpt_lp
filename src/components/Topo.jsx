import { useEffect, useState } from "react";
import { MARCA } from "../data/conteudo.js";

/* Todas as seções da página no menu, na ordem em que aparecem. */
const LINKS = [
  { id: "ciclo", rotulo: "Como funciona" },
  { id: "pilares", rotulo: "6 em 1" },
  { id: "seguranca", rotulo: "Segurança" },
  { id: "apoio", rotulo: "Extras" },
  { id: "para-quem", rotulo: "Para quem é" },
  { id: "plano", rotulo: "Planos" },
];

/**
 * Cápsula fixa no topo. Ao rolar ela encolhe, e o link da seção que está na
 * tela ganha uma pílula de destaque.
 */
export default function Topo() {
  const [rolou, setRolou] = useState(false);
  const [ativa, setAtiva] = useState("");

  useEffect(() => {
    function aoRolar() {
      setRolou(window.scrollY > 50);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // seção ativa = a que cruza a faixa do meio da tela
  useEffect(() => {
    const secoes = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtiva(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`cabecalho ${rolou ? "cabecalho--scrolled" : ""}`}>
      <div className="wrap cabecalho__container">
        <a className="cabecalho__marca" href="#topo">
          <img className="cabecalho__logo" src="/logo.png" alt="" width="26" height="26" />
          <span>
            {MARCA.nome}
            <b>{MARCA.destaque}</b>
          </span>
        </a>

        <nav className="cabecalho__nav">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={ativa === l.id ? "ativo" : undefined}>
              {l.rotulo}
            </a>
          ))}
        </nav>

        <a className="btn-secundario cabecalho__cta" href="#fechamento">
          Quero o Lure GPT
        </a>
      </div>
    </header>
  );
}
