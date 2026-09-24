import { useEffect, useRef } from "react";

/**
 * Campo de pontos que pulsa — portado do canvas da referência (elevatelp.com.br),
 * trocado de rosa para azul. Uma onda atravessa a malha de tempos em tempos e
 * acende os pontos que estão no caminho.
 *
 * Mexa aqui:
 */
const CONFIG = {
  espacamento: 30, // distância entre os pontos (px)
  raioPonto: 1.4, // tamanho base do ponto (px)
  corBase: [110, 122, 145], // cor dos pontos apagados
  alphaBase: 0.06, // opacidade dos apagados

  corAzul: [61, 123, 249], // #3D7BF9 — no original era #ff315c
  corBranca: [255, 255, 255],
  proporcaoBranca: 0.42, // fração dos pontos que acende em branco

  brilho: 0.62, // intensidade geral
  aleatoriedade: 1.85, // 0 = linha limpa · 1+ = bem esparso
  cintilacao: 0.35, // quanto os pontos piscam
  brilhoAmbiente: 0.05, // shimmer leve entre os pulsos

  intervaloPulso: 6000, // ms entre pulsos
  duracaoVarredura: 4400, // ms para o pulso atravessar
  larguraBanda: 98, // grossura do pulso (px)
  caudaFator: 1.4, // comprimento da cauda
  direcao: [1, 0.18], // direção da varredura (mais horizontal)
  variacao: 1.6, // variação de brilho por ponto

  seed: 1, // troque para gerar outra mancha
  blobs: 3, // + bolhas = forma mais irregular
  tamanhoMancha: 0.95,
  alturaMancha: 1.3,
  bordaSuave: [0.22, 0.6],
};

/** RNG determinístico — a mancha tem que ser a mesma a cada carregamento. */
function fazerRng(seed) {
  let s = seed | 0;
  return function () {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 8) & 0xffffff) / 0xffffff;
  };
}

export default function CampoDePontos({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paradoPorPreferencia = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let W = 0;
    let H = 0;
    let pontos = [];
    let projMin = 0;
    let projMax = 0;
    let dirX = 0;
    let dirY = 0;
    let raf = 0;
    let inicio = performance.now();

    function montar() {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rng = fazerRng(CONFIG.seed);

      // Bolhas que definem a forma orgânica da mancha.
      const bolhas = [];
      for (let i = 0; i < CONFIG.blobs; i++) {
        bolhas.push({
          cx: W * (0.18 + rng() * 0.64),
          cy: H * (0.2 + rng() * 0.6),
          rx: W * CONFIG.tamanhoMancha * (0.22 + rng() * 0.26),
          ry: H * CONFIG.alturaMancha * (0.24 + rng() * 0.3),
        });
      }

      function densidade(x, y) {
        let d = 0;
        for (const b of bolhas) {
          const dx = (x - b.cx) / b.rx;
          const dy = (y - b.cy) / b.ry;
          d = Math.max(d, 1 - Math.min(1, Math.hypot(dx, dy)));
        }
        return d;
      }

      const [suaveA, suaveB] = CONFIG.bordaSuave;
      pontos = [];
      for (let y = CONFIG.espacamento / 2; y < H; y += CONFIG.espacamento) {
        for (let x = CONFIG.espacamento / 2; x < W; x += CONFIG.espacamento) {
          const d = densidade(x, y);
          if (d <= 0) continue;
          // Borda recortada: quanto mais perto da borda, mais ponto some.
          const chance = d < suaveA ? d / suaveA : Math.min(1, (d - suaveA) / suaveB + 0.4);
          if (rng() > chance) continue;

          pontos.push({
            x,
            y,
            fase: rng() * Math.PI * 2,
            atraso: rng() * CONFIG.aleatoriedade,
            forca: 0.5 + rng() * CONFIG.variacao * 0.5,
            branco: rng() < CONFIG.proporcaoBranca,
            raio: CONFIG.raioPonto * (0.75 + rng() * 0.6),
          });
        }
      }

      const [dx, dy] = CONFIG.direcao;
      const norma = Math.hypot(dx, dy) || 1;
      dirX = dx / norma;
      dirY = dy / norma;

      projMin = Infinity;
      projMax = -Infinity;
      for (const p of pontos) {
        const proj = p.x * dirX + p.y * dirY;
        if (proj < projMin) projMin = proj;
        if (proj > projMax) projMax = proj;
      }
      if (!pontos.length) {
        projMin = 0;
        projMax = 1;
      }
    }

    function desenhar(agora) {
      ctx.clearRect(0, 0, W, H);

      const ciclo = CONFIG.intervaloPulso;
      const t = (agora - inicio) % ciclo;
      const avanco = Math.min(1, t / CONFIG.duracaoVarredura);
      const cauda = CONFIG.larguraBanda * CONFIG.caudaFator;
      const posicao = projMin - cauda + (projMax - projMin + cauda * 2) * avanco;
      const segundos = agora / 1000;

      for (const p of pontos) {
        const proj = p.x * dirX + p.y * dirY;
        const dist = posicao - proj - p.atraso * CONFIG.larguraBanda;

        // Frente curta, cauda longa: o pulso "arrasta" atrás de si.
        let intensidade = 0;
        if (dist >= 0) {
          intensidade = Math.max(0, 1 - dist / cauda);
        } else {
          intensidade = Math.max(0, 1 + dist / (CONFIG.larguraBanda * 0.55));
        }
        intensidade = intensidade * intensidade * p.forca * CONFIG.brilho;

        // Cintilância + shimmer de fundo.
        const piscada = 1 + Math.sin(segundos * 2.2 + p.fase) * CONFIG.cintilacao;
        const ambiente =
          CONFIG.brilhoAmbiente * (0.5 + 0.5 * Math.sin(segundos * 0.9 + p.fase * 1.7));
        const aceso = Math.min(1, Math.max(0, intensidade * piscada + ambiente));

        const cor = p.branco ? CONFIG.corBranca : CONFIG.corAzul;
        const [br, bg, bb] = CONFIG.corBase;
        const r = Math.round(br + (cor[0] - br) * aceso);
        const g = Math.round(bg + (cor[1] - bg) * aceso);
        const b = Math.round(bb + (cor[2] - bb) * aceso);
        const alpha = CONFIG.alphaBase + aceso * 0.85;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, p.raio * (1 + aceso * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(desenhar);
    }

    function estatico() {
      ctx.clearRect(0, 0, W, H);
      const [br, bg, bb] = CONFIG.corBase;
      for (const p of pontos) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${br},${bg},${bb},${CONFIG.alphaBase + 0.12})`;
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function reiniciar() {
      montar();
      if (paradoPorPreferencia) {
        estatico();
      } else {
        cancelAnimationFrame(raf);
        inicio = performance.now();
        raf = requestAnimationFrame(desenhar);
      }
    }

    reiniciar();

    const observer = new ResizeObserver(reiniciar);
    observer.observe(canvas);

    // Fora da tela ou aba escondida: não gasta bateria à toa.
    let naTela = true;
    function atualizar() {
      if (paradoPorPreferencia) return;
      if (document.hidden || !naTela) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        inicio = performance.now();
        raf = requestAnimationFrame(desenhar);
      }
    }
    const aoTrocarAba = atualizar;
    document.addEventListener("visibilitychange", aoTrocarAba);
    const vigia = new IntersectionObserver(([e]) => {
      naTela = e.isIntersecting;
      atualizar();
    });
    vigia.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      vigia.disconnect();
      document.removeEventListener("visibilitychange", aoTrocarAba);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
