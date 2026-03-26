---
name: doc-de-pagina
description: >
  Esta skill deve ser usada quando o usuário pedir para "gerar documentação da página atual",
  "criar manual desta tela", "documentar esta funcionalidade", "gerar manual do que está
  aberto no navegador", "criar doc da página selecionada" ou qualquer variação que implique
  em gerar um manual do usuário a partir do conteúdo de uma tela já aberta no sistema.
  Lê a página atual via Claude in Chrome, gera o manual, e opcionalmente faz upload no
  Google Drive e injeta botão flutuante se os conectores estiverem disponíveis.
metadata:
  version: "0.2.0"
---

# doc-de-pagina

Gere a documentação do usuário a partir de uma página aberta no navegador.

## Pré-verificação (executar antes de qualquer fase)

Antes de iniciar, verifique silenciosamente quais ferramentas estão disponíveis:

- **Claude in Chrome disponível?** — verifique se as ferramentas `get_page_text` e `read_page` existem no contexto atual
- **Google Drive disponível?** — verifique se há ferramentas MCP do Google Drive no contexto atual

Se **Claude in Chrome não estiver disponível**, pare e informe:
> "Para usar esta skill, o Claude in Chrome precisa estar ativo com uma aba do VSeguradora aberta. Abra o sistema no navegador e tente novamente."

Se **Google Drive não estiver disponível**, continue normalmente — o manual será salvo localmente ao final. Não trave nem pare por causa disso.

---

## Fase 1 — Leitura da Página

Use `get_page_text` para capturar o texto da página atual e `read_page` para o screenshot.

A partir do conteúdo capturado, extraia:
- **NomeFeature** — título da página ou cabeçalho H1
- **NomeModulo** — menu ativo, breadcrumb ou segmento da URL
- **URL** — endereço atual da página

Se não conseguir identificar NomeFeature ou NomeModulo, pergunte ao usuário antes de prosseguir.

---

## Fase 2 — Análise e Geração do Manual

Com base no conteúdo capturado, mapeie os elementos visíveis (campos, botões, tabelas, validações) e gere o manual completo seguindo o template em `references/manual-structure.md`.

**Estrutura obrigatória:**

**Título:** `Manual do Usuário — [NomeFeature]`
**Subtítulo:** `Módulo: [NomeModulo] | Versão: 1.0 | Data: [data atual]`

1. **Visão Geral** — o que a tela faz, para quem, pré-requisitos
2. **Passo a Passo de Uso** — cada ação descrita em linguagem do usuário, tabela de campos, validações
3. **FAQ** — mínimo 5 perguntas inferidas dos campos e fluxos observados

---

## Fase 3 — Upload no Google Drive (apenas se conector disponível)

> Se o Google Drive **não estiver disponível**, pule esta fase e vá direto para o Encerramento.

Pasta compartilhada da equipe — ID fixo: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`

Estrutura:
```
[ID: 1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg]/
└── [NomeModulo]/
    └── Manual do Usuário — [NomeFeature].gdoc
```

1. Localize ou crie a subpasta `[NomeModulo]` dentro da pasta raiz compartilhada
2. Crie o Google Doc com o conteúdo do manual gerado na Fase 2
3. Capture o link compartilhável do documento

Se ocorrer qualquer erro, salve localmente em `Manuais/[NomeModulo]/Manual_[NomeFeature].md` e continue para o Encerramento.

---

## Fase 4 — Botão Flutuante (apenas se Drive disponível e link obtido)

> Se não houver link do Drive, pule esta fase.

Use `javascript_tool` do Claude in Chrome para injetar o botão. Substitua `DRIVE_URL` pelo link real:

```javascript
(function(driveUrl) {
  const existing = document.getElementById('vseg-manual-btn');
  if (existing) existing.remove();
  const btn = document.createElement('div');
  btn.id = 'vseg-manual-btn';
  btn.innerHTML = `<a href="${driveUrl}" target="_blank" rel="noopener noreferrer"
    style="display:flex;align-items:center;gap:8px;text-decoration:none;color:#fff;">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="white"/>
      <path d="M14 2V8H20" stroke="white" stroke-width="1.5"/>
      <path d="M8 13H16M8 17H13" stroke="#1a73e8" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
    <span style="font-size:13px;font-weight:600;white-space:nowrap;">Manual do Usuário</span>
  </a>`;
  Object.assign(btn.style, {
    position:'fixed', bottom:'24px', left:'24px', zIndex:'99999',
    background:'linear-gradient(135deg,#1a73e8,#0d47a1)',
    padding:'10px 16px', borderRadius:'28px',
    boxShadow:'0 4px 16px rgba(26,115,232,0.45)',
    cursor:'pointer', fontFamily:'Google Sans,Roboto,Arial,sans-serif',
  });
  btn.onmouseenter = () => { btn.style.transform='scale(1.06)'; };
  btn.onmouseleave = () => { btn.style.transform='scale(1)'; };
  document.body.appendChild(btn);
})('DRIVE_URL');
```

---

## Encerramento

Exiba o resumo com o status real de cada fase:

```
✅ Página analisada: [URL]
✅ Manual gerado — 3 seções
[✅ ou ⚠️] Drive: [link do documento] ou "Google Drive não conectado — manual salvo localmente"
[✅ ou —] Botão flutuante: injetado na tela ou "não aplicável (Drive indisponível)"
```

Se o Drive não estiver conectado, instrua ao final:
> "Para habilitar o upload automático, ative o conector **Google Drive** em Configurações → Conectores no Claude."
