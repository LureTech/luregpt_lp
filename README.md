# Lure GPT — Landing Page (v2)

React + Vite. **Réplica da página `ElevateLP (1).html`** (clone de
elevatelp.com.br), seção por seção, com **o rosa trocado por azul** e o
conteúdo do briefing v2 de 08 · set · 2026.

Medidas tiradas da página original: Rethink Sans 400 a 62px centralizado,
fundo `#0C0C0C`, subtítulo Inter 17px `#B9B9B9`, container 1440px.

### O que é réplica da original

| Original | Aqui |
| --- | --- |
| Marca centralizada no topo, sem menu | `Topo.jsx` (+ pílula fixa com CTA ao rolar) |
| Arco de luz rosa atrás do H1 | `.arco` — meia-lua azul |
| Grade em perspectiva | `.hero__grade-topo` / `.grade-chao` |
| Pontinhos que pulsam | `CampoDePontos.jsx` (canvas portado, rosa → azul) |
| Notebook girando | **o vídeo do próprio HTML**, em `public/notebook.mp4` |
| CTA duplo (rótulo + pílula) | `.cta-duplo` + `.shiny-cta` |
| "100% WordPress" com 2 ladrilhos | `Base.jsx` — Meta Ads + Google Ads |
| Faixa com notificações + 3 colunas | `Ciclo.jsx` |
| Card de depoimento com onda de áudio | `Depoimento.jsx` |
| Cards escalonados | `Pilares.jsx` — os seis pilares |
| Preço: logo, card com entalhe, checklist | `Plano.jsx` |
| FAQ em 2 colunas | `Faq.jsx` |

### O notebook

O MacBook girando é um MP4 de 42s que estava embutido em base64 dentro do
`ElevateLP (1).html`. Foi extraído para `public/notebook.mp4` (9,3 MB) com
`public/notebook-poster.png` como poster.

Ele usa `mix-blend-mode: screen` para o fundo preto do vídeo sumir e o notebook
flutuar. Por isso `.hero__conteudo` **não pode ter `z-index`** — z-index ali cria
contexto de empilhamento e o blend para de funcionar.

⚠️ 9,3 MB pesa. Está com `preload="none"`, mas antes de subir vale recomprimir
(o briefing pede LCP < 2,5s no 4G).

🚨 **As telas dentro do notebook são clientes da ElevateLP, não da Lure.**
O vídeo e o poster mostram landing pages do portfólio de outra agência. Serve
como marcação de layout, mas **não pode ir ao ar assim** — seria mostrar o
trabalho dos outros como se fosse seu. Regravar com telas do Lure GPT.

## Mini-interfaces

Cada card tem um pedaço de tela desenhado em CSS/SVG (`components/Mocks.jsx` +
`styles/mocks.css`): forma de onda do áudio, clonagem antes/depois, calendário
do Instagram, linha do tempo do vídeo, chat do CRM e a tela de bloqueio do
celular. São marcações honestas — trocar por captura real quando as telas
existirem, sem mexer no layout.

## Animação

**GSAP + ScrollTrigger** para as entradas e o 3D, **Lenis** para a rolagem suave
(a referência usava Lenis — o HTML original tem `class="lenis"` no `<html>`).
Tudo mora em [src/lib/animacoes.js](src/lib/animacoes.js).

O que cada seção faz: título palavra a palavra · hero com paralaxe em camadas
(arco, órbitas e notebook em ritmos diferentes) · ladrilhos entrando girando em
`rotateY` · trilhas do circuito se acendendo · cards em `rotateX` escalonado ·
colunas honestas vindo dos lados · preço com `back.out` · marquee que acelera
conforme a velocidade da rolagem · `ligarTilt()` inclina card, ladrilho e plano
seguindo o ponteiro (desligado no toque).

### Três armadilhas que já foram corrigidas — não reintroduzir

1. **`once: true` em todo gatilho de entrada.** Sem isso, o `ScrollTrigger.refresh()`
   que dispara quando o vídeo e as fontes terminam de carregar reaplica o estado
   inicial, o `onEnter` não repete, e a seção fica **invisível para sempre**.
   Foi exatamente o que aconteceu: 16 de 29 blocos sumiram.
2. **Sem `overflow: hidden` no `.palavra`.** A versão anterior empurrava a
   palavra com `yPercent: 118` dentro de uma caixa que cortava. Quando o tween
   não tocava, o título inteiro desaparecia.
3. **Rede de segurança** (`rede()` em `animacoes.js`). Roda no scroll, no resize,
   a cada 1,2s e depois do `load`: qualquer bloco que já passou da dobra e ainda
   está apagado é forçado a aparecer, matando o tween pendente antes. Uma
   landing page não pode ter seção em branco — o pior caso vira "sem animação",
   nunca "sem conteúdo".

Testado com rolagem de mouse, tecla End, pulo direto para o rodapé, abertura em
`#âncora` e toque no celular: 0 blocos apagados indevidamente, 74 palavras de
título todas visíveis, sem scroll horizontal em 390px.

⚠️ GSAP + Lenis somam ~53 KB gzip ao pacote (de 59 KB para 113 KB). Se o LCP
apertar no 4G, o primeiro corte é carregar `animacoes.js` com `import()`
dinâmico depois do primeiro render.

## Detalhes que não são enfeite

- **`useRevelar`** revela também quem já passou por cima do topo. Sem isso, uma
  rolagem rápida (barra arrastada, tecla Fim, âncora) faz o observer perder o
  elemento e a seção fica **invisível para sempre**. Testado pulando direto
  para o rodapé: 21 de 21 blocos aparecem.
- **Órbitas do banner** (`components/Orbitas.jsx`): três anéis em tempos
  diferentes, o do meio ao contrário, para os pontos nunca alinharem.
- **Circuito** (`components/Circuito.jsx`): trilhas com pulso correndo para o
  centro. Some com `prefers-reduced-motion`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o dist
```

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Qualquer texto da página | [src/data/conteudo.js](src/data/conteudo.js) |
| Cores | [src/styles/tokens.css](src/styles/tokens.css) |
| Efeitos (botão shiny, glow, marquee) | [src/styles/global.css](src/styles/global.css) |
| Layout das seções | [src/styles/secoes.css](src/styles/secoes.css) |
| Ordem dos blocos | [src/App.jsx](src/App.jsx) |
| Destino do lead | [src/lib/lead.js](src/lib/lead.js) |
| GA4 / Pixel / UTM | [src/lib/tracking.js](src/lib/tracking.js) e [index.html](index.html) |

### Paleta

Tradução direta do rosa da referência para azul:

| referência | aqui | uso |
| --- | --- | --- |
| `#C71A3A` | `#1B3E8F` | azul escuro, bordas |
| `#F93D60` | `#3D7BF9` | acento principal — CTA, números, glow |
| `#FF8AA0` | `#8AB4FF` | azul claro, kickers |
| `#ff1949` | `#1E5BFF` | glow que segue o mouse nos cards |
| `#b82545` | `#2F6BFF` | realce do botão shiny |
| `#0D0D0D` | `#080C15` | fundo |

### Trocar a headline

O briefing pede teste A/B de três headlines (seção 05). As três estão em
`HEADLINES_TESTE`. Para trocar a que vai ao ar, edite `HERO.titulo`.

## O que ainda falta (briefing, seção 13)

Nada disto pode ir ao ar como está:

- **P2 — preço.** Os dois planos estão com `sob consulta` e a nota `PENDENTE (P2)`.
  Definir as faixas em `PLANOS` (`src/data/conteudo.js`).
- **P4 — número de operação real.** O terceiro número do hero está com o selo
  "a definir". Confirmar o que pode ser publicado (clientes ativos, peças/mês ou
  verba sob gestão) e preencher em `HERO.numeros`.
- **P6 — destino do lead.** Definir `VITE_ENDPOINT_LEAD` num `.env`. Sem isso o
  formulário funciona, mostra a tela de sucesso e **não entrega o lead em lugar
  nenhum** — só avisa no console. O ideal do briefing é a própria página oferecer
  o horário: plugar a agenda no lugar marcado em `Fechamento.jsx`.
- **P7 — CRM.** Confirmar a integração com o CRM da agência (aparece na ficha do
  pilar 6).
- **Rastreio.** GA4 e Pixel estão comentados no `index.html` com IDs `XXXXX`.
  Descomentar e trocar. A conversão já dispara `generate_lead` (GA4), `Lead`
  (Pixel) e `lead_demo_lure_gpt` (dataLayer).
- **Páginas legais.** Os links de privacidade, termos e exclusão de dados estão
  como `#`. Apontar para as páginas do sistema.
- **Vídeos e telas.** Toda moldura de mídia está com a marcação da prova que
  aquele bloco precisa (briefing 06). Passar o arquivo em `src` para o
  componente `Midia` — ele já carrega só quando entra na tela, mudo e em laço.
- **Open Graph.** Falta o arquivo `public/og-lure-gpt.jpg` (1200×630).

```bash
# .env
VITE_ENDPOINT_LEAD=https://seu-n8n/webhook/lead-lp
```

## Decisões que o código já respeita

- **Uma H1 só** — só o hero. Todo o resto é h2/h3/h4.
- **Vídeo mudo, em laço, carregado sob demanda** — `IntersectionObserver` com
  `rootMargin: 200px` e `preload="none"`.
- **Mobile primeiro** — todo o CSS parte do celular; sem scroll horizontal.
- **Sem banco de imagem** — a tela do produto é a arte. Nenhuma ilustração
  genérica na página.
- **Azul é acento único** — CTA, número em destaque, detalhe de borda.
- **LGPD** — consentimento obrigatório no formulário e link de privacidade.
- **`prefers-reduced-motion`** — o campo de pontos do hero para de animar e as
  transições somem.
- **Jargão de tecnologia fora da copy** — as APIs aparecem só na ficha técnica
  miúda de cada pilar e na seção de prova, onde o briefing pede.
