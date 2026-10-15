/**
 * Variações curtas da LP — /1, /2 e /3.
 *
 * A LP principal ficou com ~18 telas de celular e não converte. As variações
 * usam exatamente as mesmas seções, com o mesmo design e o mesmo texto: só
 * escolhem menos blocos. Cada uma testa um corte diferente.
 *
 * Os valores são os ids das seções (os mesmos do menu do topo). Hero e FAQ
 * entram em todas e não estão na lista. O plano entra em todas.
 */
export const VARIANTES = {
  // /1 — como funciona + as objeções (segurança e para quem é)
  v1: ["ciclo", "seguranca", "para-quem", "plano"],
  // /2 — o produto: os seis pilares + para quem é
  v2: ["pilares", "para-quem", "plano"],
  // /3 — mínima: só como funciona
  v3: ["ciclo", "plano"],
};
