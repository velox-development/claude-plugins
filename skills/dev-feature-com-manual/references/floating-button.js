/**
 * VSeguradora — Botão Flutuante de Manual do Usuário
 *
 * Injeta um botão fixo no canto inferior esquerdo da tela que abre
 * o manual do usuário armazenado no Google Drive.
 *
 * USO:
 *   Substitua DRIVE_URL pelo link do Google Doc gerado pelo plugin.
 *   O script pode ser executado via:
 *     1. Claude in Chrome (javascript_tool) — injeção automática pelo plugin
 *     2. Console do navegador — para testes manuais
 *     3. Bookmarklet — para uso recorrente sem extensão
 *     4. Inclusão na página HTML do VSeguradora — persistência permanente
 *
 * PERSISTÊNCIA PERMANENTE (recomendado para produção):
 *   Inclua este script no layout base do VSeguradora (ex: _Layout.cshtml)
 *   dentro de uma tag <script> ao final do <body>, com a DRIVE_URL já
 *   preenchida para cada módulo.
 */

(function injectManualButton(driveUrl, options) {
  if (!driveUrl || driveUrl === 'DRIVE_URL') {
    console.warn('[VSeguradora] floating-button.js: driveUrl não informado.');
    return;
  }

  // Remove instância anterior se já existir
  const existing = document.getElementById('vseg-manual-btn');
  if (existing) existing.remove();

  /* ---------- Opções configuráveis ---------- */
  const cfg = Object.assign({
    label: 'Manual do Usuário',
    bottom: '24px',
    left: '24px',
    colorStart: '#1a73e8',
    colorEnd: '#0d47a1',
    borderRadius: '28px',
    zIndex: '99999',
  }, options || {});

  /* ---------- Ícone SVG (documento) ---------- */
  const iconSvg = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18
               C19.1 22 20 21.1 20 20V8L14 2Z" fill="white"/>
      <path d="M14 2V8H20" stroke="white" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 13H16" stroke="#1a73e8" stroke-width="1.8"
            stroke-linecap="round"/>
      <path d="M8 17H13" stroke="#1a73e8" stroke-width="1.8"
            stroke-linecap="round"/>
    </svg>`;

  /* ---------- Monta o elemento ---------- */
  const btn = document.createElement('div');
  btn.id = 'vseg-manual-btn';
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', cfg.label);
  btn.setAttribute('tabindex', '0');

  btn.innerHTML = `
    <a href="${driveUrl}" target="_blank" rel="noopener noreferrer"
       style="display:flex;align-items:center;gap:8px;
              text-decoration:none;color:#fff;outline:none;">
      ${iconSvg}
      <span style="font-size:13px;font-weight:600;
                   white-space:nowrap;letter-spacing:.01em;">
        ${cfg.label}
      </span>
    </a>`;

  /* ---------- Estilos do botão ---------- */
  Object.assign(btn.style, {
    position:     'fixed',
    bottom:       cfg.bottom,
    left:         cfg.left,
    zIndex:       cfg.zIndex,
    background:   `linear-gradient(135deg, ${cfg.colorStart}, ${cfg.colorEnd})`,
    padding:      '10px 16px',
    borderRadius: cfg.borderRadius,
    boxShadow:    `0 4px 16px rgba(26,115,232,0.45)`,
    cursor:       'pointer',
    transition:   'transform .2s ease, box-shadow .2s ease',
    fontFamily:   'Google Sans, Roboto, Arial, sans-serif',
    userSelect:   'none',
    border:       'none',
    outline:      'none',
  });

  /* ---------- Hover e foco ---------- */
  const onEnter = () => {
    btn.style.transform  = 'scale(1.06)';
    btn.style.boxShadow  = `0 6px 22px rgba(26,115,232,0.62)`;
  };
  const onLeave = () => {
    btn.style.transform  = 'scale(1)';
    btn.style.boxShadow  = `0 4px 16px rgba(26,115,232,0.45)`;
  };

  btn.addEventListener('mouseenter', onEnter);
  btn.addEventListener('mouseleave', onLeave);
  btn.addEventListener('focus',      onEnter);
  btn.addEventListener('blur',       onLeave);

  /* Acessibilidade: Enter / Space abrem o link */
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(driveUrl, '_blank', 'noopener');
    }
  });

  /* ---------- Injeta na página ---------- */
  document.body.appendChild(btn);
  console.info('[VSeguradora] Manual button injected →', driveUrl);

})('DRIVE_URL' /* ← substitua pelo link do Google Doc */);


/* =============================================================
 * BOOKMARKLET (uso rápido sem extensão)
 * =============================================================
 * Para criar um bookmarklet: salve nos favoritos do navegador
 * com o URL abaixo (substitua DRIVE_URL antes):
 *
 * javascript:(function(){var s=document.createElement('script');
 * s.src='data:text/javascript,'+encodeURIComponent(
 *   document.getElementById('vseg-manual-btn-src')&&
 *   document.getElementById('vseg-manual-btn-src').textContent
 * );document.head.appendChild(s);})();
 *
 * =============================================================
 * INCLUSÃO PERMANENTE NO _Layout.cshtml (ASP.NET MVC)
 * =============================================================
 *
 * No arquivo Views/Shared/_Layout.cshtml, antes de </body>:
 *
 * @{
 *   var manualUrl = ViewBag.ManualDriveUrl ?? "";
 * }
 * @if (!string.IsNullOrEmpty(manualUrl))
 * {
 *   <script>
 *     (function() {
 *       // cole aqui o conteúdo da função injectManualButton acima
 *       // substituindo 'DRIVE_URL' por '@manualUrl'
 *     })();
 *   </script>
 * }
 *
 * No controller, defina: ViewBag.ManualDriveUrl = "https://docs.google.com/...";
 * =============================================================
 */
