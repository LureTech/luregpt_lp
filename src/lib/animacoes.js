import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Camada de animação da página.
 *
 * Lenis faz a rolagem suave com inércia e o GSAP anima cada seção conforme
 * ela entra.
 *
 * Tudo é montado por `iniciarAnimacoes()` e desmontado pelo que ela devolve.
 * Quem pediu menos movimento não recebe nada disso: a página aparece pronta.
 */

const menosMovimento = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Quebra o texto em palavras embrulhadas, para animar uma a uma.
 *
 * Cada palavra vira um inline-block — e inline-block quebra linha sozinho.
 * Por isso um pedaço só de pontuação ("." depois de "áudio") é grudado na
 * palavra anterior: senão o ponto final desce para a linha de baixo.
 */
function partirEmPalavras(el) {
  if (el.dataset.partido) return Array.from(el.querySelectorAll(".palavra > span"));
  el.dataset.partido = "1";

  const nos = Array.from(el.childNodes);
  el.textContent = "";

  const soPontuacao = (t) => !/[\p{L}\p{N}]/u.test(t);
  let ultima = null; // último .palavra criado, para colar pontuação nele

  for (const no of nos) {
    const texto = no.textContent ?? "";
    const classe = no.nodeType === 1 ? no.className : "";

    for (const pedaco of texto.split(/(\s+)/)) {
      if (!pedaco) continue;

      if (/^\s+$/.test(pedaco)) {
        el.appendChild(document.createTextNode(" "));
        ultima = null; // depois de um espaço, a pontuação é de outra palavra
        continue;
      }

      if (soPontuacao(pedaco) && ultima) {
        ultima.firstChild.textContent += pedaco;
        continue;
      }

      const fora = document.createElement("span");
      fora.className = `palavra${classe ? ` ${classe}` : ""}`;
      const dentro = document.createElement("span");
      dentro.textContent = pedaco;
      fora.appendChild(dentro);
      el.appendChild(fora);
      ultima = fora;
    }
  }

  return Array.from(el.querySelectorAll(".palavra > span"));
}

/**
 * Entrada com destino explícito.
 *
 * `gsap.from` descobre o estado final lendo o elemento na hora em que é
 * criado. Aqui vários elementos têm tilt, transição de CSS e a rede de
 * segurança mexendo no mesmo transform, e às vezes o GSAP lia o estado de
 * partida como destino: a animação "rodava" e o card ficava apagado.
 * Este atalho recebe as mesmas opções do `from`, mas manda o destino neutro
 * (opacidade 1, sem deslocamento, escala 1) explicitamente.
 */
const NEUTRO = {
  opacity: 1,
  x: 0,
  y: 0,
  xPercent: 0,
  yPercent: 0,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  filter: "blur(0px)",
};
const TEMPO = new Set([
  "duration",
  "delay",
  "ease",
  "stagger",
  "scrollTrigger",
  "repeat",
  "yoyo",
  "onStart",
  "onComplete",
  "onUpdate",
]);
function entrar(alvos, opcoes) {
  // seção que não está na página (ex.: depoimento, ainda pendente): não
  // anima e não enche o console de "target not found"
  if (!gsap.utils.toArray(alvos).length) return null;
  const gatilho = opcoes.scrollTrigger?.trigger;
  if (typeof gatilho === "string" && !document.querySelector(gatilho)) return null;

  const de = {};
  const para = { immediateRender: true };
  for (const [chave, valor] of Object.entries(opcoes)) {
    if (TEMPO.has(chave)) para[chave] = valor;
    else if (chave in NEUTRO) {
      de[chave] = valor;
      para[chave] = NEUTRO[chave];
    } else {
      // transformOrigin e afins valem para o trajeto inteiro
      de[chave] = valor;
      para[chave] = valor;
    }
  }
  return gsap.fromTo(alvos, de, para);
}

export function iniciarAnimacoes() {
  if (menosMovimento()) {
    document.querySelectorAll("[data-revela]").forEach((el) => {
      el.setAttribute("data-visto", "true");
    });
    return () => {};
  }

  /* ---------------- rolagem suave (Lenis) ----------------
     Lenis e não ScrollSmoother: o Lenis rola a janela de verdade, então
     window.scrollY continua valendo para quem lê (o topo que encolhe, o
     ScrollTrigger). Defaults do Lenis, sem calibrar. Teclado, busca do
     navegador e âncoras seguem nativos; o Lenis só acompanha. */
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  const aoTick = (tempo) => lenis.raf(tempo * 1000);
  gsap.ticker.add(aoTick);
  gsap.ticker.lagSmoothing(0);

  // âncoras rolam pelo Lenis; o desconto do topo fixo vem do
  // scroll-margin-top do CSS, que o Lenis respeita como o navegador
  function rolarAte(alvo, imediato = false) {
    lenis.scrollTo(alvo, { immediate: imediato });
  }

  function aoClicarAncora(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (href === "#") return;
    const alvo = document.querySelector(href);
    if (!alvo) return;
    e.preventDefault();
    rolarAte(alvo);
  }
  document.addEventListener("click", aoClicarAncora);

  if (window.location.hash && window.location.hash !== "#fechamento") {
    const alvo = document.querySelector(window.location.hash);
    if (alvo) requestAnimationFrame(() => rolarAte(alvo, true));
  }

  // popup do formulário aberto: o fundo não rola
  const html = document.documentElement;
  const vigiaModal = new MutationObserver(() => {
    if (html.classList.contains("modal-aberto")) lenis.stop();
    else lenis.start();
  });
  vigiaModal.observe(html, { attributes: true, attributeFilter: ["class"] });

  const ctx = gsap.context(() => {
    /* ---------------- títulos: palavra a palavra ---------------- */
    // .digita fica de fora: ele ja vem quebrado em letras e o divisor de
    // palavras achataria a estrutura. Esses ganham entrada simples.
    gsap.utils.toArray("h1:not(.digita), h2:not(.digita)").forEach((titulo) => {
      const palavras = partirEmPalavras(titulo);
      if (!palavras.length) return;

      entrar(palavras, {
        y: 30,
        rotateX: -48,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: titulo, start: "top 90%", once: true },
      });
    });

    gsap.utils.toArray(".digita").forEach((titulo) => {
      entrar(titulo, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: titulo, start: "top 90%", once: true },
      });
    });

    /* ---------------- hero ---------------- */
    const entrada = gsap.timeline({ defaults: { ease: "power3.out" } });
    entrada
      .from(".cabecalho", { y: -20, opacity: 0, duration: 0.8 }, 0)
      .from(".hero .selo", { y: 18, opacity: 0, duration: 0.7 }, 0.2)
      .from(".hero__acoes", { y: 26, opacity: 0, duration: 0.8 }, "-=0.25")
      .from(".hero__reforco", { y: 14, opacity: 0, duration: 0.6 }, "-=0.5")
      .from(".mockup-desktop", { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4")
      .from(".palco__cartao", { scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.6");

    // profundidade: cada camada do fundo anda num ritmo
    gsap.to(".arco", {
      y: 140,
      scale: 1.1,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    /* ---------------- linhas neon: acendem ao chegar na tela ---------------- */
    entrar(".neon", {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: ".ladrilhos", start: "top 82%", once: true },
    });

    // ladrilhos entram girando em 3D, um de cada lado
    const ladrilhos3d = gsap.utils.toArray(".ladrilho-3d");
    if (ladrilhos3d[0]) {
      entrar(ladrilhos3d[0], {
        x: -70,
        rotateY: 55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ladrilhos", start: "top 80%", once: true },
      });
    }
    if (ladrilhos3d[1]) {
      entrar(ladrilhos3d[1], {
        x: 70,
        rotateY: -55,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ladrilhos", start: "top 80%", once: true },
      });
    }

    entrar(".estatistica", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".estatistica", start: "top 90%", once: true },
    });

    /* ---------------- trio do ciclo ---------------- */
    // Uma sequência só para os três: cada item sobe e a tela dele se revela
    // de cima para baixo (clip-path, sem tocar no transform do .mock, que o
    // CSS já usa para a inclinação). Antes eram dois gatilhos separados e os
    // itens apareciam fora de ordem, aos pulos.
    {
      const trio = gsap.timeline({
        scrollTrigger: { trigger: ".trio", start: "top 80%", once: true },
      });
      gsap.utils.toArray(".trio-item").forEach((item, i) => {
        const palco = item.querySelector(".trio-item__palco");
        const textos = item.querySelectorAll(".trio-item__titulo, .trio-item__texto, .rodape__grade > *");
        const em = i * 0.22;
        trio
          .fromTo(item, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", immediateRender: true }, em)
          .fromTo(
            palco,
            { clipPath: "inset(0 0 100% 0 round 20px)" },
            { clipPath: "inset(0 0 0% 0 round 20px)", duration: 0.9, ease: "power3.inOut", immediateRender: true },
            em + 0.1
          )
          .fromTo(textos, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, immediateRender: true }, em + 0.45);
      });
    }
    entrar(".aviso", {
      x: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: ".faixa", start: "top 88%", once: true },
    });

    /* ---------------- depoimento ---------------- */
    entrar(".depoimento", {
      scale: 0.93,
      opacity: 0,
      rotateX: 10,
      duration: 1.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".depoimento", start: "top 85%", once: true },
    });
    entrar(".depoimento__play", {
      scale: 0,
      duration: 0.8,
      ease: "back.out(2.2)",
      scrollTrigger: { trigger: ".depoimento", start: "top 72%", once: true },
    });

    /* ---------------- pilares ---------------- */
    entrar(".cartao", {
      y: 80,
      rotateX: -16,
      opacity: 0,
      duration: 1,
      stagger: { each: 0.1, from: "start" },
      ease: "power3.out",
      scrollTrigger: { trigger: ".escada", start: "top 82%", once: true },
    });

    /* ---------------- travas, lista, colunas ---------------- */
    entrar(".trava", {
      y: 34,
      opacity: 0,
      duration: 0.7,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: { trigger: ".travas", start: "top 85%", once: true },
    });
    // e ainda: os cartões da grade sobem em cascata
    entrar(".bento__item", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: ".bento", start: "top 82%", once: true },
    });
    // a ilustração de cada cartão acende logo depois dele
    entrar(".bento__visual > .vis", {
      scale: 0.85,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.35,
      ease: "back.out(1.6)",
      scrollTrigger: { trigger: ".bento", start: "top 82%", once: true },
    });

    // segurança: o painel entra de lado e conta a história em ordem —
    // campanha pausada, pedido de confirmação, depois a trilha
    {
      const painel = gsap.timeline({
        scrollTrigger: { trigger: ".cofre", start: "top 78%", once: true },
      });
      painel
        .fromTo(".cofre__painel", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", immediateRender: true })
        .fromTo(".cofre__campanha, .cofre__metricas", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, immediateRender: true }, "-=0.4")
        .fromTo(".cofre__pedido", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", immediateRender: true }, "+=0.1")
        .fromTo(".cofre__log li", { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.35, immediateRender: true }, "+=0.2");
    }
    entrar(".honesta--sim", {
      x: -50,
      rotateY: 12,
      opacity: 0,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: { trigger: ".honestas", start: "top 78%", once: true },
    });
    entrar(".honesta:not(.honesta--sim)", {
      x: 50,
      rotateY: -12,
      opacity: 0,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: { trigger: ".honestas", start: "top 78%", once: true },
    });
    // Depois que as colunas chegam, os itens entram um por um: primeiro a
    // coluna "sim" inteira, depois a "não". Cada marca salta no lugar logo
    // antes do texto dela.
    {
      const linha = gsap.timeline({
        delay: 0.55,
        scrollTrigger: { trigger: ".honestas", start: "top 78%", once: true },
      });
      gsap.utils.toArray(".honesta").forEach((col) => {
        col.querySelectorAll("li").forEach((li) => {
          const marca = li.querySelector(".honesta__marca");
          const texto = li.querySelector(".honesta__marca + span");
          linha
            // fromTo com o fim explícito: com `from` o GSAP chegou a gravar
            // escala 0 como destino e a marca nunca aparecia
            .fromTo(
              marca,
              { scale: 0, rotate: -120, opacity: 0 },
              { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: "back.out(2.6)", immediateRender: true },
              ">-0.18"
            )
            .fromTo(
              texto,
              { x: -22, opacity: 0, filter: "blur(6px)" },
              { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out", immediateRender: true },
              "<0.08"
            );
        });
      });
    }

    /* ---------------- plano ---------------- */
    entrar(".plano", {
      y: 60,
      rotateX: -12,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".preco-grade", start: "top 82%", once: true },
    });
    entrar(".vantagens li", {
      x: 34,
      opacity: 0,
      duration: 0.65,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: { trigger: ".vantagens", start: "top 86%", once: true },
    });
    entrar(".plano__valor", {
      scale: 0.7,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: ".plano", start: "top 70%", once: true },
    });

    /* ---------------- FAQ ---------------- */
    entrar(".faq__item", {
      y: 26,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: { trigger: ".faq", start: "top 86%", once: true },
    });
    /* ---------------- movimento contínuo e entradas extras ---------------- */
    // subtítulos e selos de cada seção sobem logo depois do título
    gsap.utils.toArray(".secao .sub, .secao .selo, .seguranca__selo").forEach((el) => {
      entrar(el, {
        y: 22,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // hero: depois da entrada, os cartões ficam flutuando
    gsap.to(".palco__cartao", {
      y: -12,
      duration: 2.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 1.1 },
      delay: 2.2,
    });

    // Meta e Google boiando, fora de fase
    gsap.utils.toArray(".ladrilho-3d img").forEach((img, i) => {
      gsap.to(img, {
        y: -9,
        rotate: i ? 2 : -2,
        duration: 2.4 + i * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.6,
      });
    });
    entrar(".estatistica__caixa", {
      scale: 0,
      rotate: -30,
      duration: 0.7,
      ease: "back.out(2)",
      scrollTrigger: { trigger: ".estatistica", start: "top 88%", once: true },
    });

    // pilares: o texto de cada cartão entra em cascata depois do cartão, e a
    // tela lá dentro anda devagar com a rolagem (parallax)
    gsap.utils.toArray(".cartao").forEach((cartao) => {
      entrar(cartao.querySelectorAll(".cartao__corpo > *"), {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: { trigger: cartao, start: "top 82%", once: true },
      });
      const tela = cartao.querySelector(".cartao__palco .mock > img, .mock-app__celular");
      if (tela) {
        gsap.fromTo(
          tela,
          { yPercent: 6, scale: 1.08 },
          {
            yPercent: -6,
            scale: 1.08,
            ease: "none",
            scrollTrigger: { trigger: cartao, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    });

    // segurança: o ícone de cada trava salta
    entrar(".trava__icone", {
      scale: 0,
      rotate: -45,
      duration: 0.6,
      stagger: 0.07,
      delay: 0.3,
      ease: "back.out(2.2)",
      scrollTrigger: { trigger: ".travas", start: "top 85%", once: true },
    });

    // plano: etiqueta cai no lugar, botão chega por último
    entrar(".plano__etiqueta", {
      y: -30,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
      ease: "bounce.out",
      scrollTrigger: { trigger: ".plano", start: "top 75%", once: true },
    });
    entrar(".plano__cta", {
      y: 20,
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      delay: 0.7,
      ease: "back.out(1.8)",
      scrollTrigger: { trigger: ".plano", start: "top 75%", once: true },
    });

    // rodapé: colunas subindo
    entrar(".rodape__grade > *", {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ".rodape__grade", start: "top 92%", once: true },
    });

    /* ---------------- números que sobem ---------------- */
    gsap.utils.toArray("[data-contar]").forEach((el) => {
      const alvo = parseFloat(el.dataset.contar);
      const prefixo = el.dataset.prefixo || "";
      const sufixo = el.dataset.sufixo || "";
      const objeto = { v: 0 };

      gsap.to(objeto, {
        v: alvo,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          el.textContent = prefixo + Math.round(objeto.v).toLocaleString("pt-BR") + sufixo;
        },
      });
    });

    /* ---------------- barra de progresso da leitura ---------------- */
    const barra = document.querySelector(".progresso");
    if (barra) {
      gsap.to(barra, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    }

    /* ---------------- marquee acompanha a rolagem ---------------- */
    const trilho = document.querySelector(".marquee__trilho");
    if (trilho) {
      let atual = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const alvo = 1 + Math.min(Math.abs(self.getVelocity()) / 1600, 3);
          const antes = atual;
          atual += (alvo - atual) * 0.12;
          // só reescreve quando muda de verdade: cada escrita recalcula o estilo
          if (Math.abs(atual - antes) < 0.02) return;
          trilho.style.animationDuration = `${(42 / atual).toFixed(1)}s`;
        },
      });
    }
  });

  /**
   * Rede de segurança.
   * Uma landing page não pode ter seção em branco. Se por qualquer motivo um
   * gatilho não tocar — refresh no meio do caminho, rolagem restaurada pelo
   * navegador, âncora que pula direto — isto mostra o que ficou para trás.
   */
  const animaveis = () =>
    document.querySelectorAll(
      ".cartao, .trio-item, .trava, .honesta, .plano, .faq__item, .form, " +
        ".ladrilho, .aviso, .bento__item, .cofre__painel, .cofre__pedido, .cofre__log li, .vantagens li, .lista-seca li, .honesta li, .honesta__marca, " +
        ".depoimento, .estatistica, .palco__tela, .palco__cartao, .palavra > span, " +
        ".honesta__marca + span, .secao .sub, .secao .selo, .cartao__corpo > *, .plano__etiqueta, " +
        ".plano__cta, .form__campo, .form__dupla, .form__consent, .form__enviar, " +
        ".trio-item__titulo, .trio-item__texto, .rodape__grade > *"
    );

  // Quanto tempo um elemento pode ficar apagado na tela antes de ser
  // socorrido. Sem essa folga a rede atropelava toda entrada em cascata: o
  // item que ainda esperava a vez (opacidade 0) era mostrado na hora.
  const TOLERANCIA = 2600;
  const apagadoDesde = new WeakMap();

  let varredura = 0;
  function rede() {
    if (varredura) return;
    varredura = requestAnimationFrame(() => {
      varredura = 0;
      const alturaTela = window.innerHeight;
      const agora = performance.now();
      for (const el of animaveis()) {
        const r = el.getBoundingClientRect();
        // só o que já deveria ter aparecido: acima da dobra e ainda apagado
        if (r.top > alturaTela) continue;
        if (parseFloat(getComputedStyle(el).opacity) > 0.05) {
          apagadoDesde.delete(el);
          continue;
        }
        if (!apagadoDesde.has(el)) apagadoDesde.set(el, agora);
        if (agora - apagadoDesde.get(el) < TOLERANCIA) continue;
        // matar o tween pendente antes: senão ele reescreve o estado inicial
        // no quadro seguinte e o bloco some de novo.
        gsap.killTweensOf(el);
        gsap.set(el, {
          opacity: 1,
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          rotateY: 0,
          filter: "none",
        });
      }
    });
  }

  // Sem ouvir o scroll: a varredura mede e lê o estilo de dezenas de
  // elementos (layout forçado) e, presa a cada quadro de rolagem, travava a
  // página. Como a tolerância já é de 2,6s, o relógio basta.
  window.addEventListener("resize", rede);
  ScrollTrigger.addEventListener("refresh", rede);
  const relogioRede = setInterval(rede, 2500);

  if (import.meta.env.DEV) {
    window.__ST = ScrollTrigger;
    window.__lenis = lenis;
  }

  ScrollTrigger.refresh();

  // medir de novo quando o peso pesado terminar de carregar: o poster do
  // notebook e as fontes mudam a altura da pagina e movem todos os gatilhos
  function remedir() {
    ScrollTrigger.refresh();
    rede();
  }
  window.addEventListener("load", remedir);
  if (document.fonts?.ready) document.fonts.ready.then(remedir);

  /* ---------------- pausa o que está fora da tela ----------------
     As animações em laço (neon, onda de áudio, brilhos…) seguem gastando
     quadro mesmo longe da vista. Seção fora da tela ganha data-fora e o CSS
     congela tudo dentro dela. */
  const vigia = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) e.target.toggleAttribute("data-fora", !e.isIntersecting);
    },
    { rootMargin: "200px 0px" }
  );
  document.querySelectorAll("section, footer").forEach((el) => vigia.observe(el));

  /* ---------------- desmontagem ---------------- */
  return () => {
    vigia.disconnect();
    ctx.revert();
    clearInterval(relogioRede);
    if (varredura) cancelAnimationFrame(varredura);
    window.removeEventListener("resize", rede);
    window.removeEventListener("load", remedir);
    ScrollTrigger.removeEventListener("refresh", rede);
    document.removeEventListener("click", aoClicarAncora);
    vigiaModal.disconnect();
    gsap.ticker.remove(aoTick);
    lenis.destroy();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

/**
 * Foco de luz que segue o cursor.
 * Só onde existe cursor de verdade — no toque não faz sentido e só gasta bateria.
 */
export function ligarFoco() {
  if (menosMovimento() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return () => {};
  }

  const foco = document.querySelector(".foco");
  if (!foco) return () => {};

  const parasX = gsap.quickTo(foco, "x", { duration: 0.85, ease: "power3" });
  const parasY = gsap.quickTo(foco, "y", { duration: 0.85, ease: "power3" });

  function mover(e) {
    parasX(e.clientX);
    parasY(e.clientY);
  }

  window.addEventListener("pointermove", mover, { passive: true });
  return () => window.removeEventListener("pointermove", mover);
}

/**
 * Inclinação 3D que acompanha o ponteiro.
 * Só em quem tem cursor — no toque não existe hover e o efeito só atrapalha.
 */
export function ligarTilt(seletor, forca = 8) {
  if (menosMovimento() || window.matchMedia("(hover: none)").matches) return () => {};

  const limpezas = [];

  document.querySelectorAll(seletor).forEach((el) => {
    const girarX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3" });
    const girarY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3" });
    const subir = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    function mover(e) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      girarX(-py * forca);
      girarY(px * forca);
      subir(-6);
    }
    function sair() {
      girarX(0);
      girarY(0);
      subir(0);
    }

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", sair);
    limpezas.push(() => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", sair);
    });
  });

  return () => limpezas.forEach((f) => f());
}
