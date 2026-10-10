import { MARCA, OBRIGADO, RODAPE } from "../data/conteudo.js";
import { CHAVE_NOME } from "../lib/lead.js";

/**
 * Primeiro nome de quem acabou de enviar. Vem pela sessionStorage, não pela
 * URL: assim o nome não aparece no endereço nem nos relatórios de anúncio.
 * Quem abre /obrigado direto (sem ter enviado) vê a versão sem nome.
 */
function lerNome() {
  try {
    const nome = (sessionStorage.getItem(CHAVE_NOME) || "").trim().split(/\s+/)[0] || "";
    if (!nome || nome.length > 24) return "";
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
  } catch {
    return "";
  }
}

/** Página de obrigado — para onde o formulário leva depois do envio. */
export default function Obrigado() {
  const nome = lerNome();
  const titulo = nome
    ? OBRIGADO.titulo.map((p) => ({ ...p, t: p.t.replace("{nome}", nome) }))
    : OBRIGADO.tituloSemNome;

  return (
    <div className="obrigado">
      <div className="obrigado__brilho" aria-hidden="true" />
      <div className="obrigado__grade" aria-hidden="true" />

      <header className="obrigado__topo wrap">
        <a className="obrigado__marca" href="/">
          <img src="/logo.png" alt="" width="26" height="26" />
          <span>
            {MARCA.nome}
            <b>{MARCA.destaque}</b>
          </span>
        </a>
      </header>

      <main className="obrigado__miolo wrap">
        <div className="obrigado__check" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path className="obrigado__check-traco" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <p className="obrigado__selo">{OBRIGADO.selo}</p>

        <h1 className="obrigado__titulo">
          {titulo.map((p, i) =>
            p.realce ? (
              <span className="realce" key={i}>
                {p.t}
              </span>
            ) : (
              <span key={i}>{p.t}</span>
            )
          )}
        </h1>

        <p className="obrigado__sub">{OBRIGADO.sub}</p>

        <section className="obrigado__passos" aria-labelledby="obrigado-passos">
          <h2 id="obrigado-passos">{OBRIGADO.passosTitulo}</h2>
          <ol>
            {OBRIGADO.passos.map((p, i) => (
              <li key={p.titulo}>
                <span className="obrigado__numero">{i + 1}</span>
                <div>
                  <strong>{p.titulo}</strong>
                  <p>{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <a className="btn-secundario obrigado__voltar" href="/">
          {OBRIGADO.voltar}
        </a>
      </main>

      <footer className="obrigado__rodape">{RODAPE.assinatura}</footer>
    </div>
  );
}
