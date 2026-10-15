import { lerOrigem, varianteAtual } from "./tracking.js";

/**
 * Destino do lead: webhook do n8n.
 *
 * Fica escrito aqui como padrão porque a URL acaba no JavaScript público da
 * página de qualquer jeito (variáveis VITE_ são embutidas no build) — não é
 * segredo. A variável VITE_WEBHOOK_LEAD, se existir na hospedagem, substitui.
 *
 * O nome antigo, VITE_ENDPOINT_LEAD, ficou de fora de propósito: na Vercel
 * ele ainda aponta para o webhook GET antigo e a conta que publica não pode
 * editar variável de produção. Lendo ele, o POST iria para o webhook velho.
 */
const ENDPOINT_PADRAO =
  "https://webhook.deverascompany.com.br/webhook/9377a626-eb59-4b13-ba09-a6e7a20b8b82";
const ENDPOINT_LEAD = import.meta.env.VITE_WEBHOOK_LEAD || ENDPOINT_PADRAO;

/** Onde o formulário deixa o nome para a página de obrigado cumprimentar. */
export const CHAVE_NOME = "lure_lead_nome";
export const PAGINA_OBRIGADO = "/obrigado/";

export async function enviarLead(dados) {
  // UTMs (utm_source, utm_campaign…) viram campos soltos, para o n8n ler direto
  const carga = {
    ...dados,
    consentimento: dados.consentimento ? "sim" : "nao",
    ...lerOrigem(),
    pagina: window.location.href,
    variante: varianteAtual(),
    enviadoEm: new Date().toISOString(),
  };

  // sem destino, falha de verdade: melhor a pessoa ver erro do que um
  // "Recebido!" falso com o lead perdido
  if (!ENDPOINT_LEAD) throw new Error("Destino do lead não configurado");

  // O webhook do n8n é POST e libera CORS: os campos vão como JSON e o n8n
  // lê cada um em `body`. Com CORS a resposta é legível, então dá para saber
  // se o n8n recebeu de verdade — se não recebeu, a pessoa vê o erro em vez
  // de um "Recebido!" falso.
  const resposta = await fetch(ENDPOINT_LEAD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carga),
  });
  if (!resposta.ok) throw new Error(`Webhook respondeu ${resposta.status}`);
  return { ok: true };
}

/** Máscara de WhatsApp brasileira, aplicada enquanto a pessoa digita. */
export function mascararWhatsapp(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}
