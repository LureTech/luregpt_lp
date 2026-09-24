/**
 * Texto da página. Briefing · Landing Page · v2 — Lure GPT — 08 · set · 2026.
 *
 * A estrutura visual segue a ElevateLP (o HTML de referência), seção por seção.
 * PENDENTE marca o que o briefing deixou como "definir"/"confirmar" — nada disso
 * pode ir ao ar (briefing, seção 01).
 */

export const MARCA = {
  nome: "Lure",
  destaque: "GPT",
  assinatura: "por lure digital",
};

/* ---------- 01 · hero ---------- */
export const HERO = {
  selo: "a nova era das agências",
  titulo: [
    { t: "A primeira IA que " },
    { t: "opera a sua agência", realce: true },
    { t: " de ponta a ponta." },
  ],
  sub: "Pare de pagar por meia dúzia de ferramentas soltas. Do primeiro clique ao lead fechado, o Lure GPT cria campanhas no áudio, edita vídeos, clona páginas e atende o CRM. Tudo no mesmo lugar.",
  ctaRotulo: "Explorar recursos",
  cta: "Quero o Lure GPT",
  reforco: "O comercial chama no seu WhatsApp em até 5 minutos e libera o acesso da sua agência.",
  parceiro: "Parceiro oficial da Meta",
  tela: {
    titulo: "Vídeo de 20s, sem corte",
    texto: "Dedo segura o microfone, fala, e a campanha aparece pausada no gerenciador.",
  },
  cartao: {
    numero: "6 em 1",
    rotulo: "ferramentas que a sua agência deixa de assinar",
  },
};

export const HEADLINES_TESTE = {
  A: "Manda um áudio. A campanha sobe.",
  B: "Vídeo, post, página e campanha. Sem abrir seis ferramentas.",
  C: "Construído dentro de uma agência. Não numa mesa de produto.",
};

/* ---------- 02 · a base (era "100% WordPress") ---------- */
export const BASE = {
  titulo: [
    { t: "Prepare-se para " },
    { t: "trocar seis ferramentas por uma", realce: true },
  ],
  sub: "Esquece painel de relatório e chat com IA. Isso aqui roda a agência inteira.",
  selo: "meta + google ads",
  ladrilhos: [
    { texto: "Meta Ads", forte: true },
    { texto: "Google Ads", claro: true },
  ],
  estatistica: {
    valor: "R$ 0",
    texto: "por vídeo editado — sem upload, sem fila de render",
  },
};

/* ---------- 03 · o ciclo (era "Uma estrutura que converte") ---------- */
export const CICLO = {
  titulo: [
    { t: "Do bruto ao lead atendido, " },
    { t: "sem trocar de aba", realce: true },
  ],
  sub: "Os seis pilares não são uma lista de recursos: são o caminho inteiro de um anúncio. É esse caminho que justifica trocar seis ferramentas por uma.",
  faixa: {
    frase: "Você fala. O sistema monta, publica e avisa.",
    avisos: [
      { icone: "▶", texto: "Campanha criada", forte: "pausada", hora: "agora" },
      { icone: "●", texto: "Lead novo", forte: "no CRM", hora: "agora" },
    ],
  },
  colunas: [
    {
      titulo: "Produz",
      texto: "O vídeo é montado no navegador, o post entra na agenda e a landing page é clonada do link que você colar.",
      etapas: ["Vídeo", "Post", "Página"],
    },
    {
      titulo: "Sobe",
      texto: "Você fala a campanha. Meta e Google na mesma conversa, e ela nasce pausada para você conferir antes de gastar.",
      etapas: ["Campanha"],
    },
    {
      titulo: "Atende",
      texto: "O lead cai no CRM e o chat cuida da base: quem não respondeu, o que travou no funil, como está o atendimento.",
      etapas: ["Lead", "Atendimento"],
    },
  ],
};

/* ---------- 04 · depoimento ---------- */
export const DEPOIMENTO = {
  titulo: [
    { t: "Não acredite só na nossa palavra. " },
    { t: "Ouça quem opera nele.", realce: true },
  ],
  cabeca: {
    titulo: "Depoimentos — Lure GPT",
    autor: "gestor da casa · Lure Digital",
    inicial: "L",
  },
  tempo: "0:10",
  hora: "4:39 PM",
  botao: "Assista no YouTube",
  // PENDENTE: gravar o depoimento (briefing 06, provas transversais).
  placeholder: "Depoimento em vídeo de um gestor da própria casa — dá rosto e tira a cara de software de fora.",
};

/* ---------- 05 · os seis pilares (era "Não basta ser bonita") ---------- */
export const PILARES = {
  titulo: [
    { t: "Não é chat com IA. " },
    { t: "É a operação inteira.", realce: true },
  ],
  sub: "Seis coisas que o produto faz e que o mercado não tem juntas. Cada uma substitui uma ferramenta que você assina hoje.",
  itens: [
    {
      id: "campanha",
      titulo: "Sobe campanha mandando áudio",
      fala: "Sobe uma campanha de leads pra oficina do Marcelo, 80 reais por dia, começando amanhã.",
      texto:
        "Do celular, no trânsito, entre uma reunião e outra. O sistema entende, monta e devolve pronta para você revisar — pausada, com confirmação dupla em tudo que mexe em dinheiro.",
      ficha: "ElevenLabs Scribe · fallback Whisper · Meta Marketing API v21 · Google Ads API v20",
    },
    {
      id: "landing",
      titulo: "Clona a landing page",
      fala: "Clona essa aqui e deixa editável.",
      texto:
        "Cola o endereço e a página volta clonada, editável e pronta para publicar. A LP do concorrente que está convertendo vira a base da sua em minutos — sem fila de designer.",
      ficha: "Navegador real em servidor próprio · centavos por página · fila isolada",
    },
    {
      id: "instagram",
      titulo: "Posta sozinho no Instagram",
      fala: "Agenda esse carrossel pras contas do grupo A, terça às 9.",
      texto:
        "Feed, story, reel e carrossel para dezenas de contas na mesma tela. O cliente conecta o Instagram dele pelo link que você manda no WhatsApp — ninguém pede a senha dele.",
      ficha: "Calendário por conta e cor · convite de uso único · agendado → publicando → publicado",
    },
    {
      id: "video",
      titulo: "Edita o vídeo no navegador",
      fala: "Tira os silêncios, legenda e corta pra 30 segundos no formato do Reels.",
      texto:
        "Nada é enviado para servidor: o arquivo é lido do seu computador e montado ali mesmo. Sem upload, sem fila de render, sem custo por vídeo. R$ 0.",
      ficha: "Transcrição local + WebCodecs · exporta MP4 no formato de cada destino",
    },
    {
      id: "crm",
      titulo: "Conversa com o CRM",
      fala: "Quem não respondeu essa semana e travou depois da proposta?",
      texto:
        "Pergunte à base o que você perguntaria a um analista. Ler é livre; mandar mensagem ou alterar cadastro exige confirmação humana e fica registrado.",
      ficha: "123 rotas de leitura · 4 de escrita, com confirmação e auditoria",
    },
    {
      id: "app",
      titulo: "Sua agência no bolso",
      fala: "Instala na tela de início e avisa na tela de bloqueio.",
      texto:
        "Aplicativo instalado no celular, com aviso quando a campanha sobe, o post sai ou o lead cai. É o que fecha o argumento: dá para tocar a agência do celular.",
      ficha: "App instalável · notificação na tela de bloqueio · o microfone é a porta de entrada",
    },
  ],
};

/* ---------- 06 · segurança (bloco 10 do briefing) ---------- */
export const SEGURANCA = {
  titulo: [
    { t: "A IA não mexe sozinha " },
    { t: "na conta do seu cliente.", realce: true },
  ],
  sub: "Responde à pergunta silenciosa: “e se a IA fizer besteira na conta do meu cliente?”",
  travas: [
    { titulo: "Campanha nasce pausada", texto: "Nada gasta sem você ligar.", icone: "pausa" },
    { titulo: "Confirmação dupla no dinheiro", texto: "Toda ação que mexe em verba pede sua mão.", icone: "escudo" },
    { titulo: "Trilha de auditoria", texto: "Quem pediu, o que foi feito e quando.", icone: "trilha" },
    { titulo: "Cada gestor vê só a carteira dele", texto: "Ninguém abre o que não é seu.", icone: "pessoas" },
    { titulo: "Token criptografado", texto: "A conexão com a conta fica cifrada.", icone: "chave" },
    { titulo: "Ler é livre, escrever não", texto: "No CRM, consulta é aberta; escrita não.", icone: "olho" },
  ],
};

/* ---------- 07 · e ainda (bloco 09) ---------- */
export const APOIO = {
  titulo: [{ t: "E ainda vem junto" }],
  sub: "Cada um destes já é uma ferramenta que a sua agência assina hoje.",
  itens: [
    { titulo: "Relatório no WhatsApp", texto: "Automático, com análise e projeção.", icone: "conversa", visual: "whats" },
    { titulo: "O relatório em áudio", texto: "Na sua voz clonada. O cliente ouve no trânsito.", icone: "onda", visual: "audio" },
    { titulo: "Otimizador diário", texto: "Meta e Google revisados todo dia.", icone: "raio", visual: "otimiza" },
    { titulo: "Nota de saúde 0 a 100", texto: "Quem vai cancelar e quem aceita upsell.", icone: "pulso", visual: "saude" },
    { titulo: "Biblioteca de anúncios", texto: "O que a concorrência roda, por nicho.", icone: "biblioteca", visual: "biblio" },
    { titulo: "Saldo das contas", texto: "Antes de a campanha parar por falta de verba.", icone: "carteira", visual: "saldo" },
    { titulo: "Presença digital", texto: "Seu cliente contra os concorrentes dele.", icone: "radar", visual: "presenca" },
  ],
};

/* ---------- 08 · para quem é (bloco 11) ---------- */
export const PARA_QUEM = {
  titulo: [{ t: "Duas colunas " }, { t: "honestas", realce: true }],
  sub: "Prefiro perder a call agora do que perder o cliente no terceiro mês.",
  sim: {
    titulo: "É para você se",
    itens: [
      "Você é dono ou sócio de assessoria de tráfego, com 15 a 150 clientes ativos.",
      "Seu time tem de 3 a 20 pessoas e roda Meta e Google Ads.",
      "Você cobra mensalidade e sofre com cancelamento.",
      "Seu processo mora em planilha, ClickUp e grupo de WhatsApp.",
      "Seu time abre seis ferramentas para entregar uma campanha.",
    ],
  },
  nao: {
    titulo: "Não é para você se",
    itens: [
      "Você é e-commerce e roda a própria conta de anúncio.",
      "Você é freelancer com três clientes.",
      "Você é o cliente final do tráfego, e não a agência.",
      "Você quer comprar ferramenta sem mudar nada na operação.",
    ],
  },
};

/* ---------- 09 · plano ---------- */
export const PLANO = {
  titulo: [{ t: "Uma decisão, " }, { t: "a operação inteira", realce: true }],
  marca: { nome: "Lure", destaque: "GPT" },
  descricao:
    "Nasceu rodando uma agência de verdade, com carteira e time usando todo dia. Não é SaaS genérico adaptado.",
  nome: "Lure GPT",
  nomeDestaque: "implantação completa",
  etiqueta: "sua agência inteira",
  // PENDENTE (P2): faixa de preço não definida no briefing v2.
  de: "investimento a partir de",
  valor: "sob consulta",
  nota: "PENDENTE (P2) — definir a faixa antes de publicar",
  cta: "Quero contratar",
  vantagens: [
    { forte: "Os seis pilares", texto: "liberados desde o primeiro dia, sem módulo extra." },
    { forte: "Migração da carteira", texto: "e das contas de anúncio, sem parar a operação." },
    { forte: "Treinamento do time", texto: "e acompanhamento junto na primeira semana." },
    { forte: "Aplicativo no celular", texto: "de cada gestor, com aviso na tela de bloqueio." },
    { forte: "Instalação dedicada", texto: "opcional: o sistema na marca e no domínio da sua agência." },
  ],
};

/* ---------- 10 · FAQ ---------- */
export const FAQ = [
  {
    p: "Como funciona a migração do que eu já tenho hoje?",
    r: "Você não para a operação para migrar. Conectamos as contas de anúncio e o Instagram dos seus clientes, importamos a carteira e o time começa por um pilar — normalmente o áudio que sobe campanha. Planilha e ClickUp continuam existindo enquanto você quiser.",
  },
  {
    p: "Quanto tempo leva até o time estar rodando de verdade?",
    r: "A conta fica de pé no mesmo dia. O que leva tempo é hábito: a primeira semana é de acompanhamento junto com o seu time, e a partir da segunda o gestor já sobe campanha sozinho pelo celular.",
  },
  {
    p: "E se o meu time não usar? Já paguei por ferramenta parada.",
    r: "Foi por isso que o sistema começa pelo áudio. Ninguém precisa aprender tela nova para falar “sobe uma campanha de leads pra oficina do Marcelo”. O gestor entra pelo caminho mais fácil e descobre o resto usando.",
  },
  {
    p: "O que acontece se eu cancelar?",
    r: "As campanhas continuam onde sempre estiveram: nas contas de anúncio do seu cliente, que são suas. Você exporta a base do CRM e as peças produzidas. Nada fica preso.",
  },
  {
    p: "De quem é o dado — meu ou de vocês?",
    r: "Seu. A conta de anúncio, o Instagram e a base são do seu cliente e da sua agência. Processamos para operar o sistema, com token criptografado e trilha de auditoria, e você pede a exclusão quando quiser.",
  },
  {
    p: "Preciso entender de tecnologia para usar?",
    r: "Não. Se você sabe explicar a campanha para um gestor, você sabe pedir para o sistema. O que existe de técnico está escondido atrás de “fala o que você quer”.",
  },
  {
    p: "Vocês mexem na conta do meu cliente sem eu ver?",
    r: "Nunca. Campanha nasce pausada, toda ação que mexe em verba pede confirmação dupla e tudo fica registrado com autor e horário. Cada gestor enxerga apenas a própria carteira.",
  },
  {
    p: "Preciso trocar o CRM que eu já uso?",
    r: "A integração com o CRM da sua agência é conversada com o comercial — PENDENTE (P7) no briefing. O chat de CRM do Lure GPT já funciona sobre a base do sistema desde o primeiro dia.",
  },
];

/* ---------- 11 · fechamento ---------- */
export const FECHAMENTO = {
  titulo: [{ t: "Manda um " }, { t: "áudio", realce: true }, { t: ". A campanha sobe." }],
  sub: "Deixe seus dados e o comercial chama no WhatsApp para colocar o Lure GPT para rodar na sua agência.",
  bullets: [
    "Os seis pilares liberados desde o primeiro dia.",
    "Migração da carteira e das contas de anúncio, sem parar a operação.",
    "Treinamento do time e acompanhamento na primeira semana.",
  ],
  form: {
    titulo: "Quero o Lure GPT na minha agência",
    subtitulo: "Seis campos rápidos. O comercial responde em menos de 5 minutos.",
    botao: "Quero o Lure GPT",
    consentimento: "Autorizo o contato da Lure Digital por WhatsApp e e-mail e concordo com a",
    politica: "política de privacidade",
    sucesso: {
      titulo: "Recebido! O comercial já vai te chamar.",
      texto: "Ele chama no seu WhatsApp em até 5 minutos para liberar o acesso da sua agência.",
    },
  },
};

export const MARQUEE = [
  "Manda um áudio. A campanha sobe.",
  "Cola o link. A página volta clonada.",
  "O vídeo é montado no seu navegador.",
  "O cliente conecta o Instagram dele sozinho.",
  "R$ 0 por vídeo.",
  "Campanha nasce pausada.",
];

export const RODAPE = {
  assinatura: "Lure GPT — um produto da Lure Digital",
  links: [
    { href: "#", texto: "Política de privacidade" },
    { href: "#", texto: "Termos de uso" },
    { href: "#", texto: "Exclusão de dados" },
    { href: "#fechamento", texto: "Quero o Lure GPT" },
  ],
};
