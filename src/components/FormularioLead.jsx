import { useId, useState } from "react";
import { Seta } from "./Icones.jsx";
import { FECHAMENTO } from "../data/conteudo.js";
import { enviarLead, mascararWhatsapp } from "../lib/lead.js";
import { marcarConversao } from "../lib/tracking.js";

const VAZIO = {
  nome: "",
  whatsapp: "",
  email: "",
  pessoas: "",
  cargo: "",
  ferramenta: "",
  consentimento: false,
};

/**
 * Formulário do lead, mostrado no popup que os botões "Quero o Lure GPT"
 * abrem. Os ids dos campos levam um prefixo único para o <label htmlFor>
 * não colidir se o formulário aparecer em mais de um lugar.
 */
export default function FormularioLead({ idTitulo, fechar }) {
  const base = useId();
  const id = (campo) => `${base}-${campo}`;
  const [dados, setDados] = useState(VAZIO);
  const [estado, setEstado] = useState("parado");
  const [erro, setErro] = useState("");

  function mudar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");

    if (dados.whatsapp.replace(/\D/g, "").length < 10) {
      setErro("Confere o WhatsApp com DDD — é por ele que a gente chama.");
      return;
    }

    setEstado("enviando");
    try {
      await enviarLead(dados);
      marcarConversao({ tamanho_empresa: dados.pessoas, cargo: dados.cargo, ferramenta_atual: dados.ferramenta });
      setEstado("pronto");
    } catch {
      setEstado("erro");
      setErro("Não consegui enviar agora. Tenta de novo ou chama no WhatsApp.");
    }
  }

  return (
    <div className="form">
      {fechar && (
        <button type="button" className="form__fechar" onClick={fechar} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>
      )}
      {estado === "pronto" ? (
        <div className="form__ok">
          <h3 id={idTitulo}>{FECHAMENTO.form.sucesso.titulo}</h3>
          <p>{FECHAMENTO.form.sucesso.texto}</p>
          {/* PENDENTE (P6): embutir a agenda aqui. */}
        </div>
      ) : (
        <form onSubmit={aoEnviar} noValidate>
          <h3 id={idTitulo} style={{ fontSize: "1.4rem" }}>{FECHAMENTO.form.titulo}</h3>
          <p
            style={{
              color: "var(--cinza-fraco)",
              fontSize: "0.87rem",
              margin: "8px 0 24px",
            }}
          >
            {FECHAMENTO.form.subtitulo}
          </p>

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

          <div className="form__dupla">
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
              <label htmlFor={id("email")}>E-mail</label>
              <input
                id={id("email")}
                type="email"
                autoComplete="email"
                required
                placeholder="voce@suaagencia.com.br"
                value={dados.email}
                onChange={(e) => mudar("email", e.target.value)}
              />
            </div>
          </div>

          {/* Tamanho do time e cargo qualificam antes do contato e valem o atrito. */}
          <div className="form__dupla">
            <div className="form__campo">
              <label htmlFor={id("pessoas")}>Pessoas na empresa</label>
              <select
                id={id("pessoas")}
                required
                value={dados.pessoas}
                onChange={(e) => mudar("pessoas", e.target.value)}
              >
                <option value="">Quantas pessoas?</option>
                <option value="so-eu">Só eu</option>
                <option value="2-5">2 a 5</option>
                <option value="6-10">6 a 10</option>
                <option value="11-20">11 a 20</option>
                <option value="21-50">21 a 50</option>
                <option value="mais-50">Mais de 50</option>
              </select>
            </div>

            <div className="form__campo">
              <label htmlFor={id("cargo")}>Seu cargo na empresa</label>
              <select
                id={id("cargo")}
                required
                value={dados.cargo}
                onChange={(e) => mudar("cargo", e.target.value)}
              >
                <option value="">Escolha o cargo</option>
                <option value="dono-socio">Dono ou sócio</option>
                <option value="diretor-gerente">Diretor ou gerente</option>
                <option value="gestor-trafego">Gestor de tráfego</option>
                <option value="comercial">Comercial</option>
                <option value="desenvolvedor">Desenvolvedor</option>
                <option value="atendimento">Atendimento / CS</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className="form__campo">
            <label htmlFor={id("ferramenta")}>Qual ferramenta você usa hoje</label>
            <input
              id={id("ferramenta")}
              required
              placeholder="Planilha, ClickUp, Reportei, mLabs…"
              value={dados.ferramenta}
              onChange={(e) => mudar("ferramenta", e.target.value)}
            />
          </div>

          <label className="form__consent">
            <input
              type="checkbox"
              required
              checked={dados.consentimento}
              onChange={(e) => mudar("consentimento", e.target.checked)}
            />
            <span>
              {FECHAMENTO.form.consentimento} <a href="#">{FECHAMENTO.form.politica}</a>.
            </span>
          </label>

          <button
            type="submit"
            className="btn-cheio form__enviar"
            disabled={estado === "enviando"}
          >
            {estado === "enviando" ? "Enviando…" : FECHAMENTO.form.botao}
            <Seta />
          </button>

          {erro && <p className="form__erro">{erro}</p>}
        </form>
      )}
    </div>
  );
}
