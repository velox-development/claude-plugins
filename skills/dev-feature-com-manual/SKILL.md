---
name: dev-feature-com-manual
description: >
  Esta skill deve ser usada sempre que o usuário pedir para "implementar uma feature",
  "gerar scaffold", "criar os arquivos para", "montar o CRUD de" uma funcionalidade
  do VSeguradora E quiser que o manual do usuário seja gerado automaticamente ao final.
  Substitui o uso direto do dev-new-feature quando documentação automática é desejada.
  Após concluir os 17 artefatos do scaffold, gera e publica automaticamente o manual
  do usuário como Google Doc organizado no Google Drive e injeta um botão flutuante
  na tela com o link para o manual.
metadata:
  version: "0.2.0"
  depends-on: vseguradora-dev-tools:dev-new-feature
  requires: Google Drive connector, Claude in Chrome
---

# dev-feature-com-manual

Orquestre o scaffold completo da feature do VSeguradora seguindo o padrão N-Tier e, ao
finalizar, gere e publique automaticamente o manual do usuário no Google Drive.

## Fase 1 — Scaffold da Feature

Execute **exatamente** o mesmo fluxo do `vseguradora-dev-tools:dev-new-feature`:

1. Leia o documento de especificação técnica fornecido pelo usuário.
2. Extraia e confirme os seguintes metadados antes de começar (pergunte se ausente):
   - **NomeEntidade** — nome da entidade principal em PascalCase (ex: `Apolice`)
   - **NomeModulo** — nome do módulo/epic ao qual pertence (ex: `Emissao`, `Sinistro`)
   - **DescricaoFeature** — o que a feature faz em uma frase objetiva
3. Gere os 17 artefatos na ordem definida pelo `dev-new-feature`:
   - Entidade, Business, Repository, ViewModel, AutoMapper
   - Actions no Epic Controller, 3 Views Razor (Index, Create/Edit, Details)
   - Script SQL, Testes unitários e de integração
4. Apresente um resumo dos arquivos criados antes de avançar para a Fase 2.

## Fase 2 — Geração do Manual do Usuário

Após confirmar que o scaffold foi concluído com sucesso, inicie **automaticamente** — sem
aguardar solicitação do dev — a geração do manual do usuário.

Anuncie claramente: *"Scaffold concluído! Iniciando a geração do manual do usuário..."*

### Conteúdo do Manual

Consulte `references/manual-structure.md` para o template detalhado de cada seção.

Produza o manual com as seguintes seções, preenchidas com base na especificação e no
código gerado:

1. **Visão Geral da Feature**
   - O que é, para que serve e qual problema resolve
   - Perfis de usuário que interagem com ela
   - Pré-requisitos e dependências

2. **Passo a Passo de Uso**
   - Fluxo principal narrado em linguagem acessível (sem jargão técnico)
   - Cada ação descrita com: onde clicar, o que preencher, o que esperar
   - Comportamentos de validação e mensagens de erro mais comuns

3. **Perguntas Frequentes (FAQ)**
   - Mínimo de 5 perguntas inferidas a partir das regras de negócio implementadas
   - Respostas diretas e objetivas

### Formatação do Documento

- Título: `Manual do Usuário — [NomeEntidade]`
- Subtítulo: `Módulo: [NomeModulo] | Versão: 1.0 | Data: [data atual]`
- Use cabeçalhos H1/H2/H3 para hierarquia de seções
- Use listas numeradas para passos sequenciais
- Use listas com marcadores para itens não-ordenados
- Mantenha tom formal mas acessível, voltado ao usuário final (não ao desenvolvedor)

## Fase 3 — Upload no Google Drive

Use as ferramentas do conector **Google Drive** (já integrado ao Claude) para publicar o manual.

> **Pasta compartilhada da equipe** — ID fixo: `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`
> Todos os membros do time salvam nesta mesma pasta. Nunca crie uma pasta raiz alternativa.

### Estrutura de Pastas no Drive

```
[Pasta compartilhada — ID: 1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg]/
└── [NomeModulo]/
    └── Manual do Usuário — [NomeEntidade].gdoc
```

### Passos de Upload

1. **Localizar ou criar a subpasta do módulo** dentro da pasta compartilhada:
   - Busque por: `name = '[NomeModulo]' and '[ID_RAIZ]' in parents and mimeType = 'application/vnd.google-apps.folder'`
     onde `[ID_RAIZ]` = `1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg`
   - Se não existir, crie-a com `parents: ['1sYkqKNvvjR8b-ig6f1cd7nu4Uc6qzTDg']`

2. **Criar o Google Doc** dentro da subpasta do módulo:
   - Use `gdrive_create_file` com `mimeType = 'application/vnd.google-apps.document'`
   - Nome: `Manual do Usuário — [NomeEntidade]`
   - Parent: ID da subpasta do módulo criada/encontrada no passo anterior
   - Conteúdo: o manual gerado na Fase 2

3. **Capture o link compartilhável** do documento criado — será usado na Fase 4.

### Em caso de erro no upload

Se o conector Google Drive não estiver disponível:

1. Salve o manual como arquivo `.md` no workspace local em:
   `Manuais/[NomeModulo]/Manual_[NomeEntidade].md`
2. Informe o dev: *"Google Drive indisponível. Manual salvo localmente em
   Manuais/[NomeModulo]/Manual_[NomeEntidade].md. Ative o conector Google Drive
   no Claude e repita para fazer o upload automaticamente."*
3. Pule a Fase 4 e informe no resumo final.

## Fase 4 — Injeção do Botão Flutuante na Tela

Após obter o link do Drive, use o **Claude in Chrome** (`javascript_tool`) para injetar
o botão flutuante na tela atual do sistema VSeguradora.

Consulte `references/floating-button.js` para o código completo e as opções de
integração permanente no `_Layout.cshtml`.

Execute via `javascript_tool`, substituindo `DRIVE_URL` pelo link real:

```javascript
(function injectManualButton(driveUrl) {
  const existing = document.getElementById('vseg-manual-btn');
  if (existing) existing.remove();
  const btn = document.createElement('div');
  btn.id = 'vseg-manual-btn';
  btn.innerHTML = `<a href="${driveUrl}" target="_blank" rel="noopener noreferrer"
    title="Abrir Manual do Usuário"
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
    cursor:'pointer', transition:'transform .2s,box-shadow .2s',
    fontFamily:'Google Sans,Roboto,Arial,sans-serif', userSelect:'none',
  });
  btn.onmouseenter = () => { btn.style.transform='scale(1.06)'; btn.style.boxShadow='0 6px 22px rgba(26,115,232,0.62)'; };
  btn.onmouseleave = () => { btn.style.transform='scale(1)'; btn.style.boxShadow='0 4px 16px rgba(26,115,232,0.45)'; };
  document.body.appendChild(btn);
})('DRIVE_URL');
```

Após a injeção, capture um screenshot com `read_page` para confirmar que o botão
aparece corretamente no **canto inferior esquerdo** da tela.

## Encerramento

Ao finalizar as 4 fases, exiba o resumo consolidado:

```
✅ Scaffold concluído — [N] arquivos gerados
✅ Manual do usuário gerado — 3 seções
✅ Publicado no Drive: [link do documento]
   📁 VSeguradora > Manuais > [NomeModulo] > Manual do Usuário — [NomeEntidade]
✅ Botão flutuante injetado na tela (canto inferior esquerdo)
```

**Dica para persistência**: Para que o botão apareça automaticamente em todas as
sessões, o dev pode incluir o script de `references/floating-button.js` diretamente
no `Views/Shared/_Layout.cshtml` do VSeguradora, conforme as instruções no arquivo.
