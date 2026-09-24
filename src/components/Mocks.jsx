/**
 * Mini-interfaces.
 * Na referência todo card tem um pedaço de tela de produto dentro — é isso que
 * enche a página. Aqui elas são desenhadas em CSS/SVG: leves, sem imagem, e
 * trocáveis por captura real quando as telas existirem.
 */

/* ---------- pilar 1 · campanha por áudio ---------- */
export function MockAudio() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-audio.webp" alt="Áudio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- pilar 2 · clonagem de LP ---------- */
export function MockClone() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-clone.webp" alt="Clone" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- pilar 3 · agenda do Instagram ---------- */
export function MockAgenda() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-agenda.webp" alt="Agenda" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- pilar 4 · estúdio de vídeo ---------- */
export function MockVideo() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-video.webp" alt="Vídeo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- pilar 5 · chat de CRM ---------- */
export function MockCrm() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-crm.webp" alt="CRM" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- pilar 6 · aplicativo ---------- */
export function MockApp() {
  return (
    <div className="mock" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async"
        src="/mock-app-avisos.webp"
        alt="Notificações do Lure GPT na tela de bloqueio do celular"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% 40%' }}
      />
    </div>
  );
}

/* ---------- trio do ciclo ---------- */
export function MockProduz() {
  return (
    <div className="mock mock--trio" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-produz.webp" alt="Produz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

export function MockSobe() {
  return (
    <div className="mock mock--trio mock--centro" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-sobe.webp" alt="Sobe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

export function MockAtende() {
  return (
    <div className="mock mock--trio" style={{ padding: 0, overflow: 'hidden' }}>
      <img loading="lazy" decoding="async" src="/mock-atende.webp" alt="Atende" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
}

/* ---------- logos dos ladrilhos ---------- */
export function LogoMeta({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 16.4c2.4-3.9 4.2-5.9 6.9-5.9 3.4 0 5.6 3.3 5.6 7.7 0 4-1.9 6.6-4.8 6.6-2.6 0-4.4-1.9-7.7-7.1-3.3 5.2-5.1 7.1-7.7 7.1-2.9 0-4.8-2.6-4.8-6.6 0-4.4 2.2-7.7 5.6-7.7 2.7 0 4.5 2 6.9 5.9Z"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoGoogle({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 16.7v6.9h9.6c-.4 2.2-1.7 4.1-3.5 5.4l5.7 4.4c3.3-3.1 5.2-7.6 5.2-13 0-1.3-.1-2.5-.3-3.7H20Z" fill="#4285F4" />
      <path d="M11.4 23.4 10 24.4l-4.5 3.5C8.4 33.6 13.7 37 20 37c4.9 0 9-1.6 12-4.4l-5.7-4.4c-1.6 1.1-3.6 1.7-6.3 1.7-4.7 0-8.7-3.2-10.2-7.5Z" fill="#34A853" />
      <path d="M5.5 12.1A16.9 16.9 0 0 0 3.6 20c0 2.8.7 5.5 1.9 7.9 0 0 5.9-4.6 5.9-4.6a10.2 10.2 0 0 1 0-6.5l-5.9-4.7Z" fill="#FBBC05" />
      <path d="M20 9.9c2.7 0 5.1.9 7 2.8l5.2-5.2C29 4.5 24.9 3 20 3 13.7 3 8.4 6.4 5.5 12.1l5.9 4.7c1.5-4.3 5.5-6.9 8.6-6.9Z" fill="#EA4335" />
    </svg>
  );
}
