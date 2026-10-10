import { useEffect, useId, useRef, useState } from "react";
import { Seta } from "./Icones.jsx";
import { FECHAMENTO } from "../data/conteudo.js";
import { CHAVE_NOME, PAGINA_OBRIGADO, enviarLead, mascararWhatsapp } from "../lib/lead.js";
import { marcarConversao, marcarEnvio } from "../lib/tracking.js";

const F = FECHAMENTO.form;
const TOTAL = F.passos.length + 1; // perguntas de escolha + a tela de contato

const VAZIO = {
  cargo: "",
  faturamento: "",
  pessoas: "",
  nome: "",
  whatsapp: "",
  instagram: "",
};

/** Aceita "@agencia", "agencia" ou o link do perfil; devolve "@agencia". */
function limparInstagram(valor) {
  const usuario = valor
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[/?#].*$/, "")
    .replace(/^@+/, "");
  return usuario ? `@${usuario}` : "";
}

/**
 * Formulário do lead em passos, uma pergunta por vez — o mesmo formato do
 * assessorialure.com. Função, faturamento e tamanho do time são cartões que
 * avançam sozinhos no clique; nome, WhatsApp e Instagram ficam juntos na
 * última tela.
 */
export default function FormularioLead({ idTitulo, fechar }) {
  const base = useId();
  const id = (campo) => `${base}-${campo}`;
  const [passo, setPasso] = useState(0);
  const [dados, setDados] = useState(VAZIO);
  const [estado, setEstado] = useState("parado");
  const [erro, setErro] = useState("");
  const miolo = useRef(null);
  const avanco = useRef(0);

  useEffect(() => () => clearTimeout(avanco.current), []);

  // a cada passo, o foco vai para o primeiro campo — teclado e leitor de tela
  // acompanham a troca sem a pessoa precisar caçar onde está
  const primeiraVez = useRef(true);
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    const alvo =
      miolo.current?.querySelector("input:checked") || miolo.current?.querySelector("input");
    alvo?.focus({ preventScroll: true });
  }, [passo]);

  function mudar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    setErro(""); // o aviso some assim que a pessoa corrige
  }

  function escolher(campo, valor) {
    mudar(campo, valor);
    // uma pausa curta para a pessoa ver a marcação antes de trocar de tela
    clearTimeout(avanco.current);
    avanco.current = setTimeout(() => setPasso((p) => Math.min(p + 1, TOTAL - 1)), 260);
  }

  function voltar() {
    clearTimeout(avanco.current);
    setErro("");
    setPasso((p) => Math.max(p - 1, 0));
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");

    if (dados.nome.trim().length < 2) {
      setErro("Como a gente te chama?");
      return;
    }
    if (dados.whatsapp.replace(/\D/g, "").length < 10) {
      setErro("Confere o WhatsApp com DDD — é por ele que a gente chama.");
      return;
    }
    const instagram = limparInstagram(dados.instagram);
    if (instagram.length < 3) {
      setErro("Coloca o @ do Instagram da agência.");
      return;
    }

    setEstado("enviando");
    try {
      await enviarLead({ ...dados, instagram, consentimento: true });
      marcarConversao({ cargo: dados.cargo, faturamento: dados.faturamento, pessoas: dados.pessoas });
      setEstado("pronto");
      marcarEnvio();
      // leva para a página de obrigado; o nome vai pela sessão, não pela URL
      try {
        sessionStorage.setItem(CHAVE_NOME, dados.nome);
      } catch {
        // storage bloqueado: a página de obrigado abre sem o nome
      }
      window.location.assign(PAGINA_OBRIGADO);
    } catch {
      setEstado("erro");
      setErro("Não consegui enviar agora. Tenta de novo ou chama no WhatsApp.");
    }
  }

  const escolha = F.passos[passo];

  return (
    <div className="form form--passos">
      {fechar && (
        <button type="button" className="form__fechar" onClick={fechar} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>
      )}

      {estado === "pronto" ? (
        <div className="form__ok">
          <h3 id={idTitulo}>{F.sucesso.titulo}</h3>
          <p>{F.sucesso.texto}</p>
          {/* PENDENTE (P6): embutir a agenda aqui. */}
        </div>
      ) : (
        <>
          <h3 id={idTitulo} className="passos__titulo">
            {F.titulo.map((p, i) =>
              p.realce ? (
                <span className="realce" key={i}>
                  {p.t}
                </span>
              ) : (
                <span key={i}>{p.t}</span>
              )
            )}
          </h3>
          <p className="passos__sub">{F.subtitulo}</p>

          <div className="passos__trilho" aria-hidden="true">
            <span style={{ transform: `scaleX(${(passo + 1) / TOTAL})` }} />
          </div>
          <ol className="passos__marcos" aria-hidden="true">
            {Array.from({ length: TOTAL }, (_, i) => (
              <li key={i} data-estado={i < passo ? "feito" : i === passo ? "atual" : "depois"}>
                {i < passo ? (
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </li>
            ))}
          </ol>
          <p className="passos__contador">
            Passo {passo + 1} de {TOTAL}
          </p>

          <div className="passos__miolo" ref={miolo} key={passo}>
            {escolha ? (
              <fieldset className="passos__pergunta">
                <legend>{escolha.pergunta}</legend>
                <p className="passos__ajuda">{escolha.ajuda}</p>

                <div className="passos__opcoes">
                  {escolha.opcoes.map((o) => (
                    <label className="opcao" key={o.valor}>
                      <input
                        type="radio"
                        name={id(escolha.campo)}
                        value={o.valor}
                        checked={dados[escolha.campo] === o.valor}
                        onChange={() => escolher(escolha.campo, o.valor)}
                        // clicar de novo na já marcada também avança
                        onClick={() => dados[escolha.campo] === o.valor && escolher(escolha.campo, o.valor)}
                      />
                      <span className="opcao__bolinha" />
                      {o.rotulo}
                    </label>
                  ))}
                </div>

                {passo > 0 && (
                  <button type="button" className="passos__voltar-link" onClick={voltar}>
                    ← {F.voltar}
                  </button>
                )}
              </fieldset>
            ) : (
              <form onSubmit={aoEnviar} noValidate>
                <p className="passos__pergunta-titulo">{F.contato.pergunta}</p>
                <p className="passos__ajuda">{F.contato.ajuda}</p>

                <div className="form__campo">
                  <label htmlFor={id("nome")}>Seu nome</label>
                  <input
                    id={id("nome")}
                    autoComplete="name"
                    required
                    placeholder="Como te chamam"
                    value={dados.nome}
                    onChange={(e) => mudar("nome", e.target.value)}
                  />
                </div>

                <div className="form__campo">
                  <label htmlFor={id("whatsapp")}>WhatsApp</label>
                  <input
                    id={id("whatsapp")}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    placeholder="(11) 90000-0000"
                    value={dados.whatsapp}
                    onChange={(e) => mudar("whatsapp", mascararWhatsapp(e.target.value))}
                  />
                </div>

                <div className="form__campo">
                  <label htmlFor={id("instagram")}>@ do Instagram da agência</label>
                  <input
                    id={id("instagram")}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    placeholder="@suaagencia"
                    value={dados.instagram}
                    onChange={(e) => mudar("instagram", e.target.value)}
                  />
                </div>

                <p className="passos__consent">
                  {F.consentimento} <a href="#">{F.politica}</a>.
                </p>

                <div className="passos__botoes">
                  <button type="button" className="passos__voltar" onClick={voltar}>
                    {F.voltar}
                  </button>
                  <button type="submit" className="btn-cheio form__enviar" disabled={estado === "enviando"}>
                    {estado === "enviando" ? "Enviando…" : F.botao}
                    <Seta />
                  </button>
                </div>
              </form>
            )}
          </div>

          {erro && (
            <p className="form__erro" role="alert">
              {erro}
            </p>
          )}

          <p className="passos__seguro">{F.seguro}</p>
        </>
      )}
    </div>
  );
}
