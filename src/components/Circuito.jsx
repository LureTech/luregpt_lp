/**
 * Linhas neon que saem dos ladrilhos para os dois lados.
 * Réplica fiel da seção "100% WordPress" da ElevateLP (3): os mesmos cinco
 * caminhos por lado, todos convergindo na linha do meio (y=200), com as
 * trilhas apagadas por baixo e dois pulsos neon correndo em laço.
 *
 * viewBox 500x400. No lado esquerdo o ladrilho fica em x=500; no direito, em x=0.
 */

const CAMINHOS = {
  esquerda: [
    "M0,30 L160,30 Q190,30 190,60 L190,120 Q190,150 220,150 L270,150 Q300,150 300,180 L300,200 L500,200",
    "M0,90 L220,90 Q250,90 250,120 L250,150 Q250,180 280,180 L280,190 Q280,200 300,200 L500,200",
    "M0,200 L500,200",
    "M0,310 L220,310 Q250,310 250,280 L250,250 Q250,220 280,220 L280,210 Q280,200 300,200 L500,200",
    "M0,370 L160,370 Q190,370 190,340 L190,280 Q190,250 220,250 L270,250 Q300,250 300,220 L300,200 L500,200",
  ],
  direita: [
    "M500,30 L340,30 Q310,30 310,60 L310,120 Q310,150 280,150 L230,150 Q200,150 200,180 L200,200 L0,200",
    "M500,90 L280,90 Q250,90 250,120 L250,150 Q250,180 220,180 L220,190 Q220,200 200,200 L0,200",
    "M500,200 L0,200",
    "M500,310 L280,310 Q250,310 250,280 L250,250 Q250,220 220,220 L220,210 Q220,200 200,200 L0,200",
    "M500,370 L340,370 Q310,370 310,340 L310,280 Q310,250 280,250 L230,250 Q200,250 200,220 L200,200 L0,200",
  ],
};

/* na referência só a 2ª e a 4ª trilha têm pulso */
const ANIMADAS = [1, 3];

export default function Circuito({ lado = "direita" }) {
  const caminhos = CAMINHOS[lado];

  return (
    <svg
      className={`neon-svg neon-svg--${lado}`}
      viewBox="0 0 500 400"
      fill="none"
      aria-hidden="true"
    >
      {caminhos.map((d, i) => (
        <path key={`e-${i}`} className="neon-estatica" d={d} />
      ))}
      {ANIMADAS.map((i) => (
        <path key={`a-${i}`} className="neon-animada" d={caminhos[i]} />
      ))}
    </svg>
  );
}
