/**
 * Ícones de traço para as seções de segurança e de extras.
 * Mesmo desenho dos de Icones.jsx: 24x24, traço 1.6, cor do texto.
 */
function Base({ size = 20, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const DESENHOS = {
  pausa: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9v6M14 9v6" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  trilha: (
    <>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </>
  ),
  pessoas: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
      <path d="M16 5.2a3 3 0 010 5.6M17.5 14.6c1.6.6 2.7 2 3 4.4" />
    </>
  ),
  chave: (
    <>
      <circle cx="8" cy="14" r="4" />
      <path d="M11 11l9-9M16 6l3 3M14 8l2 2" />
    </>
  ),
  olho: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  conversa: (
    <>
      <path d="M20 11.5a8 8 0 01-11.8 7L4 20l1.5-4A8 8 0 1120 11.5z" />
      <path d="M8.5 10h7M8.5 13.5h4.5" />
    </>
  ),
  onda: <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0" />,
  raio: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  pulso: <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />,
  biblioteca: (
    <>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  carteira: (
    <>
      <path d="M4 7h14a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
      <path d="M4 7l11-3v3M16 13.5h1.5" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12l5-5" />
    </>
  ),
};

export default function IconeLinha({ nome, size }) {
  return <Base size={size}>{DESENHOS[nome]}</Base>;
}
