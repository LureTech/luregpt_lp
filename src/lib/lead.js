import { lerOrigem } from "./tracking.js";

/**
 * Destino do lead: webhook do n8n.
 *
 * Fica escrito aqui como padrão porque a URL acaba no JavaScript público da
 * página de qualquer jeito (variáveis VITE_ são embutidas no build) — não é
 * segredo. A variável VITE_ENDPOINT_LEAD, se existir na hospedagem, substitui.
 * Antes dependia só dela, e o deploy na Vercel subiu sem: o formulário
 * mostrava "Recebido!" e o lead não ia para lugar nenhum.
 */
const ENDPOINT_PADRAO =
  "https://webhook.deverascompany.com.br/webhook/55c39762-14a0-4af9-a861-c90903a83a63";
const ENDPOINT_LEAD = import.meta.env.VITE_ENDPOINT_LEAD || ENDPOINT_PADRAO;

export async function enviarLead(dados) {
  // UTMs (utm_source, utm_campaign…) viram campos soltos, para o n8n ler direto
  const carga = {
    ...dados,
    consentimento: dados.consentimento ? "sim" : "nao",
    ...lerOrigem(),
    pagina: window.location.href,
    enviadoEm: new Date().toISOString(),
  };

  // sem destino, falha de verdade: melhor a pessoa ver erro do que um
  // "Recebido!" falso com o lead perdido
  if (!ENDPOINT_LEAD) throw new Error("Destino do lead não configurado");

  // O webhook do n8n está configurado como GET: os campos vão na query
  // string e o n8n lê cada um em `query`. Em modo no-cors porque o webhook
  // não devolve cabeçalhos de CORS — a resposta fica opaca, só dá para
  // saber se a rede falhou. Se o nó passar para POST, trocar aqui.
  const corpo = new URLSearchParams();
  for (const [chave, valor] of Object.entries(carga)) {
    corpo.append(chave, typeof valor === "object" ? JSON.stringify(valor) : String(valor ?? ""));
  }
  const url = `${ENDPOINT_LEAD}${ENDPOINT_LEAD.includes("?") ? "&" : "?"}${corpo}`;

  await fetch(url, { method: "GET", mode: "no-cors" });
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
