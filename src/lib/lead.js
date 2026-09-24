import { lerOrigem } from "./tracking.js";

/**
 * Destino do lead — briefing 10, PENDENTE (P6):
 * "Aviso imediato no WhatsApp do comercial + registro em base consultável."
 *
 * Ponha aqui a URL que recebe o lead (n8n, Supabase Edge Function, o que for).
 * Enquanto estiver vazia, o formulário funciona e só não entrega em lugar nenhum —
 * o console avisa. Não subir a página assim.
 */
const ENDPOINT_LEAD = import.meta.env.VITE_ENDPOINT_LEAD || "";

export async function enviarLead(dados) {
  // UTMs (utm_source, utm_campaign…) viram campos soltos, para o n8n ler direto
  const carga = {
    ...dados,
    consentimento: dados.consentimento ? "sim" : "nao",
    ...lerOrigem(),
    pagina: window.location.href,
    enviadoEm: new Date().toISOString(),
  };

  if (!ENDPOINT_LEAD) {
    console.warn(
      "[Lure GPT LP] VITE_ENDPOINT_LEAD não configurado (P6). Lead não foi entregue:",
      carga
    );
    return { ok: true, simulado: true };
  }

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
