import { RODAPE, MARCA } from "../data/conteudo.js";

/* mesmas seções do menu do topo */
const PRODUTO = [
  { href: "#ciclo", texto: "Como funciona" },
  { href: "#pilares", texto: "6 em 1" },
  { href: "#seguranca", texto: "Segurança" },
  { href: "#apoio", texto: "Extras" },
  { href: "#para-quem", texto: "Para quem é" },
  { href: "#plano", texto: "Planos" },
];

/**
 * Rodapé enxuto: marca e duas colunas de links.
 * A chamada final fica só no formulário logo acima, sem repetir aqui.
 */
export default function Rodape() {
  const legais = RODAPE.links.filter((l) => l.href !== "#fechamento");

  return (
    <footer className="rodape">
      <div className="rodape__brilho" aria-hidden="true" />

      <div className="wrap">
        <div className="rodape__grade">
          <div className="rodape__marca-col">
            <a className="rodape__marca" href="#topo">
              <img src="/logo.png" alt="" width="30" height="30" />
              <span>
                {MARCA.nome}
                <b>{MARCA.destaque}</b>
              </span>
            </a>
            <p className="rodape__frase">A primeira IA que opera a sua agência de ponta a ponta.</p>
            <span className="parceiro-meta">
              <img src="/mock-meta.webp" alt="" width="22" height="22" />
              Parceiro oficial da Meta
            </span>
            <span className="rodape__status">
              <i /> Sistema no ar
            </span>
          </div>

          <nav className="rodape__coluna" aria-label="Produto">
            <p className="rodape__titulo">Produto</p>
            {PRODUTO.map((l) => (
              <a key={l.href} href={l.href}>
                {l.texto}
              </a>
            ))}
          </nav>

          <nav className="rodape__coluna" aria-label="Links legais">
            <p className="rodape__titulo">Legal</p>
            {legais.map((l) => (
              <a key={l.texto} href={l.href}>
                {l.texto}
              </a>
            ))}
          </nav>
        </div>

        <div className="rodape__base">
          <span>
            © {new Date().getFullYear()} {RODAPE.assinatura}
          </span>
          <a className="rodape__topo" href="#topo" aria-label="Voltar ao topo">
            Voltar ao topo
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

    </footer>
  );
}
