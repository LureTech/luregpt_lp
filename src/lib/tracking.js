/**
 * Rastreio — briefing 10.
 * GA4 + Pixel da Meta, evento de conversão no envio e UTM preservada
 * da origem até o destino do lead.
 */

const CHAVE = "lure_origem";
const CAMPOS_UTM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

/**
 * Lê a UTM da URL na primeira visita e guarda na sessão.
 * A primeira origem manda: se a pessoa voltar por outro caminho antes de
 * converter, o crédito continua com quem trouxe.
 */
export function guardarOrigem() {
  if (typeof window === "undefined") return;

  try {
    if (sessionStorage.getItem(CHAVE)) return;

    const params = new URLSearchParams(window.location.search);
    const origem = { referrer: document.referrer || "direto", entrada: window.location.href };

    for (const campo of CAMPOS_UTM) {
      const valor = params.get(campo);
      if (valor) origem[campo] = valor;
    }

    sessionStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // Navegador com storage bloqueado: a página funciona igual, só sem atribuição.
  }
}

/** Devolve a origem guardada, para ir junto no envio do formulário. */
export function lerOrigem() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE) || "{}");
  } catch {
    return {};
  }
}

/**
 * Dispara a conversão no GA4 e no Pixel.
 * Os scripts estão comentados no index.html — enquanto não subirem os IDs,
 * isto não faz nada e não quebra nada.
 */
export function marcarConversao(dados = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "produto",
      event_label: "formulario_lp",
      ...dados,
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: "Lure GPT" });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_demo_lure_gpt", ...dados });
}
