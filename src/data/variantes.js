/**
 * Variações curtas da LP — /1, /2, /3 e /4.
 *
 * A LP principal ficou com ~18 telas de celular e não converte. As variações
 * usam exatamente as mesmas seções, com o mesmo design e o mesmo texto: só
 * escolhem menos blocos. Cada uma testa um corte diferente.
 *
 * Os valores são os ids das seções (os mesmos do menu do topo), para o menu
 * e o rodapé só mostrarem o que existe na página. O hero entra em todas e
 * não está na lista; o plano também entra em todas.
 */
/* Botão único do hero na /3 e na /4 (a LP principal mantém os dois). */
export const CTA_ESPECIALISTA = "Falar com especialista";

/* Copy da /3: mais curta, batendo na dor da folha de pagamento.
   A /4 fica com a copy da LP principal, para comparar as duas. */
export const HERO_V3 = {
  titulo: [
    { t: "Diminua sua folha em até 40%", realce: true },
    { t: " com uma IA que opera a sua agência." },
  ],
  sub: "A IA sobe campanha, edita vídeo, clona página e atende o CRM. Sua agência cresce sem inchar o time.",
};

export const VARIANTES = {
  // /1 — como funciona + as objeções (segurança e para quem é) + FAQ
  v1: ["ciclo", "seguranca", "para-quem", "plano"],
  // /2 — o produto: os seis pilares + para quem é + FAQ
  v2: ["pilares", "para-quem", "plano"],
  // /3 — mínima: só como funciona + FAQ
  v3: ["ciclo", "plano"],
  // /4 — a LP inteira sem segurança, "e ainda vem junto" e FAQ
  v4: ["ciclo", "pilares", "para-quem", "plano"],
};
